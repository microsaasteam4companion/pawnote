import { Check } from "lucide-react";
import { Button } from "./ui/button";
import PawIcon from "./PawIcon";
import { motion } from "framer-motion";

const PricingSection = () => {
  return (
    <section id="pricing" className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Simple, Friendly Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you're ready
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            className="card-beige rounded-card-lg flex flex-col"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <PawIcon size="lg" variant="brown" />
              <h3 className="text-2xl font-bold text-foreground">Free</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Essential tools for your pet's recovery
            </p>
            <div className="text-4xl font-extrabold text-foreground mb-6">
              $0<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "AI-powered vet questions",
                "Organize up to 5 vet notes",
                "Daily recovery tracking",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-paw-brown flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full rounded-full py-6 font-semibold border-2 border-primary/30 hover:border-primary">
              Get Started Free
            </Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            className="card-yellow rounded-card-lg flex flex-col relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <div className="flex items-center gap-3 mb-4">
              <PawIcon size="lg" variant="yellow" />
              <h3 className="text-2xl font-bold text-foreground">PawNote Pro</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Unlimited access for complete peace of mind
            </p>
            <div className="text-4xl font-extrabold text-foreground mb-6">
              $3<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Unlimited vet visit notes",
                "Unlimited AI questions",
                "Full recovery timelines",
                "Wellness Intelligence trends",
                "All future features included",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-paw-brown flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 font-semibold shadow-lg">
              Upgrade to Pro
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Cancel anytime. No questions asked.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
