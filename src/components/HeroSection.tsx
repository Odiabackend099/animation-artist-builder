import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-glow-pulse delay-1000"></div>
      </div>

      {/* 3D Network visualization */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Main network nodes */}
          <div className="relative w-96 h-96">
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-primary rounded-lg shadow-glow animate-float">
              <div className="w-full h-full bg-gradient-primary rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
            </div>
            
            {/* Surrounding nodes */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute w-8 h-8 bg-surface-secondary border border-brand-primary/30 rounded"
                  style={{
                    left: `calc(50% + ${x}px - 16px)`,
                    top: `calc(50% + ${y}px - 16px)`,
                    animationDelay: `${i * 100}ms`
                  }}
                >
                  {/* Connection lines */}
                  <div 
                    className="absolute w-px bg-gradient-to-b from-brand-primary/60 to-transparent"
                    style={{
                      height: `${radius}px`,
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'top',
                      transform: `rotate(${-angle}rad) translateX(-50%)`
                    }}
                  ></div>
                </div>
              );
            })}
            
            {/* Outer ring nodes */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={`outer-${i}`}
                  className="absolute w-6 h-6 bg-brand-secondary/20 rounded animate-float"
                  style={{
                    left: `calc(50% + ${x}px - 12px)`,
                    top: `calc(50% + ${y}px - 12px)`,
                    animationDelay: `${i * 200 + 1000}ms`
                  }}
                ></div>
              );
            })}
          </div>
        </div>
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