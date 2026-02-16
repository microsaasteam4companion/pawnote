import { Link } from "react-router-dom";
import PawIcon from "@/components/PawIcon";
import { FileText, AlertTriangle, CreditCard, RefreshCw, Scale, Heart } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: "By using PawNote, you agree to these Terms & Conditions. If you do not agree with any part of these terms, please do not use our service. We may update these terms from time to time.",
      color: "card-blue"
    },
    {
      icon: Heart,
      title: "Service Description",
      content: "PawNote is a pet health management tool designed to help you prepare for and organize information from veterinary visits. Our goal is to reduce stress and help you be the best pet parent you can be.",
      color: "card-mint"
    },
    {
      icon: AlertTriangle,
      title: "Medical Disclaimer",
      content: "PawNote is not a medical service. The information provided through our app is for organizational purposes only. Always consult with a qualified veterinarian for medical advice regarding your pet's health. Never delay seeking professional care based on information from PawNote.",
      color: "card-yellow",
      important: true
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: "You are responsible for the accuracy of information you enter into PawNote. We recommend verifying all health-related information with your veterinarian. Keep your account credentials secure and notify us of any unauthorized access.",
      color: "card-beige"
    },
    {
      icon: CreditCard,
      title: "Subscription & Payments",
      content: "PawNote offers both free and paid subscription tiers. Paid subscriptions are billed monthly at $3/month. You may cancel at any time, and your access will continue until the end of your billing period.",
      color: "card-blue"
    },
    {
      icon: RefreshCw,
      title: "Changes to Terms",
      content: "We may update these terms from time to time to reflect changes in our services or legal requirements. We'll notify you of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.",
      color: "card-mint"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="w-full py-4 px-6 md:px-8 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PawIcon size="md" variant="brown" />
            <span className="text-xl font-bold text-foreground">PawNote</span>
          </Link>
          <Link to="/" className="text-primary hover:underline font-medium text-sm">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="w-full px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using PawNote. We've tried to keep them clear and friendly.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: February 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="w-full px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`${section.color} rounded-card-lg ${section.important ? 'ring-2 ring-primary/30' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-paw-brown" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    {section.title}
                    {section.important && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                        Important
                      </span>
                    )}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Terms;
