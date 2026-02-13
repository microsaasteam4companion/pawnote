import { Shield, Clock, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";

const secondaryFeatures = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your pet's health data stays secure and private.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Spend less time stressing, more time with your pet.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Smart summaries that make complex info simple.",
  },
  {
    icon: Users,
    title: "Trusted by Pet Parents",
    description: "Loved by thousands of caring pet owners.",
  },
];

const SecondaryFeatures = () => {
  return (
    <section className="w-full px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
            Why Pet Parents Love PawNote
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built with care for every vet visit moment.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {secondaryFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-border/50 hover:shadow-md transition-shadow"
            >
              <div className="mb-3">
                <feature.icon className="w-8 h-8 text-paw-brown" />
              </div>
              <h4 className="font-bold text-foreground mb-1">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondaryFeatures;
