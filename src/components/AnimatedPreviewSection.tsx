import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const mockScreens = [
  {
    title: "Describe your pet's issue",
    content: "My golden retriever has been scratching his ears more than usual and shaking his head...",
    type: "input" as const,
  },
  {
    title: "Smart Questions for Your Vet",
    items: [
      "Could this be an ear infection or allergies?",
      "Should I check for any discharge or odor?",
      "What signs would indicate I need emergency care?",
      "Are there any home remedies I can try safely?",
    ],
    type: "list" as const,
  },
  {
    title: "Your Visit Summary",
    items: [
      { task: "Apply ear drops twice daily", done: true },
      { task: "Keep ears dry after baths", done: false },
      { task: "Follow-up in 2 weeks", done: false },
      { task: "Monitor for fever or lethargy", done: false },
    ],
    type: "checklist" as const,
  },
];

const AnimatedPreviewSection = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentScreen((prev) => (prev + 1) % mockScreens.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const screen = mockScreens[currentScreen];

  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Device Frame */}
        <motion.div
          className="card-blue rounded-[2.5rem] p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="bg-background rounded-3xl shadow-lg overflow-hidden">
            {/* Mock Browser Header */}
            <div className="bg-secondary/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-paw-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-paw-mint/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-full px-4 py-1.5 text-xs text-muted-foreground text-center">
                  app.happytails.care
                </div>
              </div>
            </div>

            {/* Screen Content */}
            <div
              className={`p-6 md:p-8 min-h-[320px] transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
            >
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                {screen.title}
              </h3>

              {screen.type === "input" && (
                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-2xl p-4 border border-border">
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                      {screen.content}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold">
                      Get Vet Questions →
                    </div>
                  </div>
                </div>
              )}

              {screen.type === "list" && (
                <ul className="space-y-3">
                  {screen.items?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-card-yellow/30 rounded-xl p-3"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="text-paw-brown font-bold text-lg">?</span>
                      <span className="text-foreground text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {screen.type === "checklist" && (
                <ul className="space-y-3">
                  {screen.items?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 bg-card-mint/30 rounded-xl p-3"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.done
                            ? "bg-paw-mint border-paw-mint"
                            : "border-muted-foreground"
                          }`}
                      >
                        {item.done && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm md:text-base ${item.done ? "text-muted-foreground line-through" : "text-foreground"
                          }`}
                      >
                        {item.task}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 pb-6">
              {mockScreens.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentScreen
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30"
                    }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedPreviewSection;
