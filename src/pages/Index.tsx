import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecondaryFeatures from "@/components/SecondaryFeatures";
import AnimatedPreviewSection from "@/components/AnimatedPreviewSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ReviewsSection from "@/components/ReviewsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <NewsletterSection />
        <FeaturesSection />
        <SecondaryFeatures />
        <AnimatedPreviewSection />
        <PricingSection />
        <FAQSection />
        <ReviewsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
