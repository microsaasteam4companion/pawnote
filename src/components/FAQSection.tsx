import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does PawNote work?",
    answer: "PawNote helps you prepare questions before your vet visit, then lets you capture and organize everything your vet tells you. Simply describe your pet's symptoms, get smart questions to ask, and after your visit, paste your notes to get a clear checklist and timeline."
  },
  {
    question: "Is my pet's data safe?",
    answer: "Absolutely. Your pet's health information is stored securely and privately. We never share your data with third parties, and you have full control over your information at all times."
  },
  {
    question: "Can I use it during vet visits?",
    answer: "PawNote is designed to be used before, during, and after your vet visits. Many pet parents use it to take quick notes during the appointment, then organize everything afterward."
  },
  {
    question: "Is PawNote worth it for one pet?",
    answer: "Definitely! Even with just one furry friend, keeping track of vaccinations, medications, symptoms, and vet recommendations can be overwhelming. PawNote makes it simple and stress-free."
  },
  {
    question: "What if I forget to take notes at the vet?",
    answer: "No worries! After your visit, you can jot down whatever you remember, and PawNote will help you organize it into actionable items. Even partial notes are better than no notes."
  }
];

const FAQSection = () => {
  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about PawNote
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="card-beige rounded-card-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/30 last:border-b-0"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                  <span className="text-lg md:text-xl">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-base md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Help CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="mailto:business@entrext.in"
              className="text-primary hover:underline font-medium"
            >
              Contact support
            </a>
            {" or "}
            <a
              href="https://linktr.ee/entrext.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              join our community
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
