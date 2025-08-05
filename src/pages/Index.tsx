import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import VoiceAISection from "@/components/VoiceAISection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <InfrastructureSection />
      <HowItWorksSection />
      <VoiceAISection />
      <Footer />
    </div>
  );
};

export default Index;
