import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Thanks for subscribing!",
          description: "You've been added to our newsletter.",
          duration: 2000,
        });

        setTimeout(() => {
          window.open("https://linktr.ee/entrext.pro", "_blank");
        }, 1500);

        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="card-mint rounded-card-lg text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold text-foreground mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Stay in the loop & join the PawNote community
          </motion.h2>

          {/* Email Input + Button */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-full px-5 py-6 bg-background border-border/50 focus:border-primary"
            />
            <Button
              onClick={handleSubscribe}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 font-semibold shadow-lg"
            >
              Subscribe
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <a
              href="https://www.instagram.com/entrext.labs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://discord.com/invite/ZZx3cBrx2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary hover:text-primary transition-colors"
              aria-label="Discord"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path d="M18.93 5.34a16.89 16.89 0 0 0-4.07-1.23.06.06 0 0 0-.07.03c-.18.31-.38.72-.52 1.04a15.72 15.72 0 0 0-4.54 0c-.14-.32-.35-.73-.53-1.04a.06.06 0 0 0-.07-.03 16.84 16.84 0 0 0-4.07 1.23.06.06 0 0 0-.03.02C2.1 9.42 1.26 13.38 1.68 17.29a.07.07 0 0 0 .03.05 16.94 16.94 0 0 0 5.02 2.47.06.06 0 0 0 .07-.02c.39-.52.74-1.06 1.04-1.64a.06.06 0 0 0-.03-.09 11.12 11.12 0 0 1-1.56-.73.06.06 0 0 1-.01-.1c.1-.08.21-.16.31-.24a.06.06 0 0 1 .07-.01c3.27 1.46 6.81 1.46 10.04 0a.06.06 0 0 1 .07.01c.1.08.21.16.31.24a.06.06 0 0 1 0 .1c-.5.28-1.02.53-1.56.73a.06.06 0 0 0-.04.09c.3.58.66 1.12 1.04 1.64a.06.06 0 0 0 .07.02 16.9 16.9 0 0 0 5.02-2.47.06.06 0 0 0 .03-.05c.5-5.05-.84-9.44-3.55-13.32a.05.05 0 0 0-.02-.03zM8.68 14.56c-1.18 0-2.15-1.06-2.15-2.36s.95-2.36 2.15-2.36c1.21 0 2.17 1.07 2.15 2.36 0 1.3-.95 2.36-2.15 2.36zm7.94 0c-1.18 0-2.15-1.06-2.15-2.36s.95-2.36 2.15-2.36c1.21 0 2.17 1.07 2.15 2.36 0 1.3-.94 2.36-2.15 2.36z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/entrext/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://entrextlabs.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary hover:text-primary transition-colors"
              aria-label="Substack"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path d="M4 4h16M4 8h16M4 12l8 6 8-6M4 20h16" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
