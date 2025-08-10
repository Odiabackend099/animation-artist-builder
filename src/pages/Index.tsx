import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import VoiceAISection from "@/components/VoiceAISection";
import FAQSection from "@/components/FAQSection";
import FooterCTASection from "@/components/FooterCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <InfrastructureSection />
      <HowItWorksSection />
      <PricingSection />
      <VoiceAISection />
      <FAQSection />
      <FooterCTASection />
      <Footer />
    </div>
  );
};

export default Index;
