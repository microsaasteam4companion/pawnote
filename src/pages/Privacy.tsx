import { Link } from "react-router-dom";
import PawIcon from "@/components/PawIcon";
import { Shield, Lock, Eye, UserCheck, Mail } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "PawNote collects information you provide directly, including your email address when subscribing to our newsletter, and any pet health information you choose to enter into the app. We also collect basic usage data to improve our service.",
      color: "card-blue"
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: "We use your information to provide and improve PawNote's services, send you updates (if you've subscribed), and help you manage your pet's health information effectively. We never sell your data to third parties.",
      color: "card-mint"
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We take the security of your data seriously. Your pet's health information is stored securely using industry-standard encryption. We never share your data with third parties for marketing purposes.",
      color: "card-yellow"
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. You can export your data or request complete account deletion through your dashboard settings.",
      color: "card-beige"
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: "If you have questions about this Privacy Policy or want to exercise your data rights, please reach out to us at business@entrext.in.",
      color: "card-blue"
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
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters to us. Here's how we collect, use, and protect your information.
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
            <div key={index} className={`${section.color} rounded-card-lg`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-paw-brown" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {section.title}
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

export default Privacy;
