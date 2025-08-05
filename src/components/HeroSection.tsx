import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { NetworkBackground3D } from "@/components/3d/NetworkBackground3D";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Advanced 3D Network Background */}
      <div className="absolute inset-0 opacity-80">
        <NetworkBackground3D />
      </div>

      {/* Additional ambient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-glow-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 animate-fade-in-up">
            <span className="text-text-primary">The all-in-one</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Voice AI</span>
            <span className="text-text-primary"> platform</span>
          </h1>
          
          <div className="space-y-4 mb-12 animate-fade-in-up delay-200">
            <p className="text-xl text-text-secondary">
              Build, deploy, and scale realtime agents.
            </p>
            <p className="text-xl text-text-secondary">
              Open source. Enterprise grade.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up delay-400">
            <Button 
              size="lg" 
              className="bg-surface-tertiary hover:bg-surface-secondary text-text-primary border border-border text-lg px-8 py-4 h-auto"
            >
              Start building
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              className="text-text-secondary hover:text-text-primary text-lg px-8 py-4 h-auto"
            >
              <Mic className="w-5 h-5 mr-2" />
              Talk to LiveKit
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="space-y-6 animate-fade-in-up delay-600">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              </div>
              <span className="text-text-secondary">Open source voice agent framework</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              </div>
              <span className="text-text-secondary">Ultra low-latency edge infrastructure</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              </div>
              <span className="text-text-secondary">SOTA Voice AI tools and research</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;