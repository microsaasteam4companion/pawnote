import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  // Image rotation logic
  const heroImages = [
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800", // Dog portrait
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800", // Golden Retriever
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800", // Playing dogs
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800", // Puppy
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800", // White dog
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=800", // Dog portrait clean
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  const headlineVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: 0.2
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0.4
      }
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="card-beige rounded-card-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-6 md:p-12">
            {/* Left Content */}
            <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left w-full">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={headlineVariants}
              >
                Never Forget Your Vet’s Instructions Again.
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={subtitleVariants}
              >
                PawNote helps pet parents prepare for vet visits, ask the right questions, and remember every care detail without the stress.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={ctaVariants}
              >
                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto h-auto whitespace-normal bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-4 md:px-8 md:py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 leading-tight"
                  >
                    Describe your pet's issue
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Image with Cross-Dissolve */}
            <div className="flex-1 w-full lg:w-auto -mb-6 md:mb-0">
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-[300px] md:h-[400px] lg:h-[450px] w-full bg-secondary/20">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex]}
                    alt="Happy dog"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
