import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PawIcon from "./PawIcon";
import { useLocation } from "react-router-dom";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
        { role: 'bot', text: "Hello! I'm your PawNote assistant. 🐾 I can help you with questions about our app or general dog care tips. How can I assist you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    // Hide chatbot on Login, Signup, and Dashboard
    const hiddenRoutes = ["/login", "/signup", "/dashboard"];
    const shouldHide = hiddenRoutes.includes(location.pathname);

    if (shouldHide) return null;

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg = inputValue.trim();
        const newMessages = [...messages, { role: 'user', text: userMsg }];
        // @ts-ignore
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GROQ_API_KEY;

            if (!apiKey) {
                throw new Error("API Key missing");
            }

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are PawNote Pal, a friendly assistant for the PawNote pet health app. Answer ALL questions (especially pet care) in very simple, straight-to-the-point, and friendly terms. Use emojis naturally. Avoid medical jargon or complex explanations. If a question is dangerous or an emergency, tell them to call a vet immediately. If it's totally unrelated to pets or PawNote, politely bring the conversation back to pet care. Keep answers short and easy to read."
                        },
                        ...newMessages.map(m => ({
                            role: m.role === 'bot' ? 'assistant' : 'user',
                            content: m.text
                        }))
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.ok ? await response.json() : null;
            const botResponse = data?.choices[0]?.message?.content || "I'm having a little trouble thinking right now. 🐾 Please try again in a moment!";

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            // Fallback to simple logic if API fails
            setTimeout(() => {
                const lowerMsg = userMsg.toLowerCase();
                let botResponse = "I'm not quite sure about that, but I can help with vet prep, diet, or app features! Try asking 'how it works' or about 'food'. 🐾";

                if (lowerMsg.includes("food") || lowerMsg.includes("eat")) botResponse = "Give them pet food made for their age. Avoid chocolate, grapes, and onions! 🥩";
                else if (lowerMsg.includes("doctor")) botResponse = "Track their appetite and energy before going to the vet. It helps them a lot! 🩺";
                else if (lowerMsg.includes("pawnote") || lowerMsg.includes("app")) botResponse = "PawNote is a health app for pets. We help you prepare for vet visits! 🐶";

                setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            }, 500);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"> {/* Container to align items */}
            <div className="pointer-events-auto"> {/* Interactive elements wrapper */}
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10, transformOrigin: "bottom right" }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="mb-4 w-[300px] sm:w-[350px] bg-background border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col origin-bottom-right"
                        >
                            {/* Header */}
                            <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 p-1.5 rounded-full">
                                        <PawIcon size="sm" className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">PawNote Pal</h3>
                                        <p className="text-xs opacity-90">Always happy to help!</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-primary-foreground hover:bg-white/20" onClick={() => setIsOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-3 bg-secondary/20">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground self-end rounded-br-none'
                                            : 'bg-card border border-border text-foreground self-start rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="bg-card border border-border text-foreground self-start rounded-2xl rounded-bl-none shadow-sm p-3 text-sm italic animate-pulse">
                                        PawNote Pal is thinking... 🐾
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-3 bg-background border-t border-border flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-secondary/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <Button size="icon" className="rounded-full h-9 w-9 shrink-0" onClick={handleSendMessage}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
                </motion.button>
            </div>
        </div>
    );
};

export default Chatbot;
