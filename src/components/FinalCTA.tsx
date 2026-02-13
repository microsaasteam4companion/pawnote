import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import PawIcon from "./PawIcon";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="card-mint rounded-card-lg text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PawIcon size="xl" variant="brown" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 max-w-3xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Your next vet visit doesn't have to feel overwhelming.
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            PawNote helps you walk in prepared, walk out confident, and care for your pet with clarity — every single time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Link to="/login">
              <Button className="w-full sm:w-auto h-auto whitespace-normal bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-4 md:px-10 md:py-6 text-lg font-semibold shadow-lg mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 leading-tight">
                Start with your pet's issue
              </Button>
            </Link>
          </motion.div>
          <motion.p
            className="text-sm text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            PawNote does not provide medical advice. It helps summarize and organize information from your vet.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
