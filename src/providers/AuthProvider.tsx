import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

interface User {
    id: string;
    name: string;
    email: string;
    isPro: boolean;
    notesRemaining: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    decrementNotes: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (id: string, email: string, name: string) => {
        try {
            const { data: profile, error: fetchError } = await supabase
                .from('profiles')
                .select('is_pro, notes_remaining')
                .eq('id', id)
                .maybeSingle();

            if (fetchError) throw fetchError;

            if (profile) {
                const notesRemaining = profile.notes_remaining ?? 5;
                localStorage.setItem("pawnote-notes-remaining", notesRemaining.toString());
                return {
                    id,
                    name,
                    email,
                    isPro: profile.is_pro ?? false,
                    notesRemaining,
                };
            } else {
                const newProfile = { id, is_pro: false, notes_remaining: 5 };
                // Use upsert with ignoreDuplicates to avoid 409 conflict if profile was created concurrently
                const { error: upsertError } = await supabase
                    .from('profiles')
                    .upsert(newProfile, { onConflict: 'id', ignoreDuplicates: true });

                if (upsertError) {
                    // If error is not a duplicate key error (which shouldn't happen with ignoreDuplicates), try fetching again
                    console.warn("Error creating profile:", upsertError);
                    const { data: retryProfile } = await supabase
                        .from('profiles')
                        .select('is_pro, notes_remaining')
                        .eq('id', id)
                        .maybeSingle();

                    if (retryProfile) {
                        const notesRemaining = retryProfile.notes_remaining ?? 5;
                        localStorage.setItem("pawnote-notes-remaining", notesRemaining.toString());
                        return {
                            id,
                            name,
                            email,
                            isPro: retryProfile.is_pro ?? false,
                            notesRemaining,
                        };
                    }
                }

                localStorage.setItem("pawnote-notes-remaining", "5");
                return { id, name, email, isPro: false, notesRemaining: 5 };
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // Fallback to localStorage if available
            const stored = localStorage.getItem("pawnote-notes-remaining");
            const notesRemaining = stored !== null ? parseInt(stored) : 5;
            return { id, name, email, isPro: false, notesRemaining };
        }
    };

    useEffect(() => {
        let isMounted = true;

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!isMounted) return;

            if (session?.user) {
                // Optimistic UI update: Set user state immediately with defaults to unblock the UI
                const name = session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User";
                const email = session.user.email || "";

                // Only set optimistic state if we don't have this user loaded yet
                setUser(current => {
                    if (current?.id === session.user.id) return current;

                    const storedNotes = localStorage.getItem("pawnote-notes-remaining");
                    // If storedNotes is null, default to 5. If it's a string, parse it.
                    const initialNotes = storedNotes !== null ? parseInt(storedNotes) : 5;

                    return {
                        id: session.user.id,
                        name,
                        email,
                        isPro: false, // Default until fetched
                        notesRemaining: initialNotes,
                    };
                });
                setIsLoading(false);

                // Fetch full profile in the background
                fetchProfile(session.user.id, email, name).then(profile => {
                    if (isMounted) {
                        setUser(prev => ({ ...prev, ...profile }));
                    }
                });
            } else {
                if (isMounted) {
                    setUser(null);
                    setIsLoading(false);
                }
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setIsLoading(false);
            let message = error.message;
            if (error.message === "Invalid login credentials") {
                message = "Invalid email or password. Please try again.";
            }

            toast({
                variant: "destructive",
                title: "Login Failed",
                description: message,
            });
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) {
            setIsLoading(false);
            let message = error.message;
            if (error.message.includes("User already registered")) {
                message = "This email is already registered. Please log in instead.";
            }

            toast({
                variant: "destructive",
                title: "Signup Failed",
                description: message,
            });
            throw error;
        }
        await supabase.from('subscribers').upsert([{ email }], { onConflict: 'email' });

        // If auto-confirm is enabled, data.session will be present
        if (!data.session) {
            setIsLoading(false);
        }

        toast({
            title: "Success",
            description: "Account created successfully! Please check your email.",
        });
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const refreshProfile = async () => {
        if (user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('is_pro, notes_remaining')
                .eq('id', user.id)
                .maybeSingle();

            if (profile) {
                setUser({
                    ...user,
                    isPro: profile.is_pro ?? false,
                    notesRemaining: profile.notes_remaining ?? 5,
                });
            }
        }
    };

    const decrementNotes = async () => {
        if (user && !user.isPro) {
            const newCount = Math.max(0, user.notesRemaining - 1);

            // Optimistic update
            setUser({ ...user, notesRemaining: newCount });
            localStorage.setItem("pawnote-notes-remaining", newCount.toString());

            const { error } = await supabase
                .from('profiles')
                .update({
                    notes_remaining: newCount,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) {
                console.error("Error decremented notes:", error);
                // Revert on error (optional, or just fetch profile)
                await refreshProfile();
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, refreshProfile, decrementNotes }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
