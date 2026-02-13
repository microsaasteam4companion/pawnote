import FeatureCard from "./FeatureCard";
import { MessageSquare, FileText, CheckSquare, Phone, Heart, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Prepare Smart Questions",
    description: "Get AI-powered questions tailored to your pet's symptoms before you visit the vet.",
    variant: "dark" as const,
    icon: MessageSquare,
  },
  {
    title: "Capture Visit Notes",
    description: "Easily record and organize everything your vet says during the appointment.",
    variant: "blue" as const,
    icon: FileText,
  },
  {
    title: "Follow-Up Tasks",
    description: "Get clear, actionable tasks so you never miss a medication or follow-up.",
    variant: "yellow" as const,
    icon: CheckSquare,
  },
  {
    title: "Know When to Call",
    description: "Understand warning signs and know when it's time to reach out to your vet.",
    variant: "mint" as const,
    icon: Phone,
  },
  {
    title: "Reduce Post-Visit Panic",
    description: "Feel confident about your pet's care with organized, clear information.",
    variant: "beige" as const,
    icon: Heart,
  },
  {
    title: "Built for Real Visits",
    description: "Designed around how real vet appointments work, not generic health apps.",
    variant: "blue" as const,
    icon: Stethoscope,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Everything You Need for Better Vet Visits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PawNote turns overwhelming vet visits into organized, stress-free experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                variant={feature.variant}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
