import { Star } from "lucide-react";
import { motion } from "framer-motion";
// import useMeasure from "react-use-measure"; // Removed external dependency to avoid install, using standard CSS/framer

const reviews = [
  {
    name: "Sarah M.",
    pet: "Bella · Golden Retriever",
    story: "PawNote helped me capture everything my vet said so I didn't miss a thing.",
    rating: 5,
  },
  {
    name: "Michael T.",
    pet: "Luna · Tabby Cat",
    story: "I usually forget questions. Now I walk into vet visits calm and prepared.",
    rating: 5,
  },
  {
    name: "Emma R.",
    pet: "Max · Senior Beagle",
    story: "Managing medications for my senior dog is so much easier now.",
    rating: 4.8,
  },
  {
    name: "David L.",
    pet: "Whiskers · Persian",
    story: "The pre-visit questions feature is genius. Highly recommend.",
    rating: 5,
  },
  {
    name: "Jessica K.",
    pet: "Cooper · Lab",
    story: "Vet visits used to be terrifying. Now I feel confident and organized.",
    rating: 5,
  },
  {
    name: "Robert P.",
    pet: "Mochi · Shiba Inu",
    story: "Life-changing app. I actually remember what to do when I get home.",
    rating: 4.9,
  },
  {
    name: "Anita S.",
    pet: "Coco · Poodle",
    story: "Simple, beautiful, and extremely helpful for new pet parents.",
    rating: 5,
  },
  {
    name: "Tom H.",
    pet: "Rocky · Bulldog",
    story: "The best way to track vet instructions. Hands down.",
    rating: 4.7,
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <div
      className="shrink-0 w-[300px] md:w-[350px] bg-card rounded-2xl p-6 shadow-sm border border-border mx-3 flex flex-col justify-between select-none"
    >
      <div>
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-paw-yellow text-paw-yellow' : 'text-border fill-transparent'}`}
            />
          ))}
        </div>
        <p className="text-foreground text-sm md:text-base leading-relaxed mb-4">
          "{review.story}"
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-sm text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.pet}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
        >
          Loved by Pet Parents
        </motion.h2>
        <p className="text-lg text-muted-foreground">
          Join thousands of owners who stress less about vet visits.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {/* Double the list for seamless loop */}
          {[...reviews, ...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
