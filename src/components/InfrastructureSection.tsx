import { Button } from "@/components/ui/button";
import { Globe3D } from "@/components/3d/Globe3D";

const InfrastructureSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Advanced 3D Globe Background */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-60">
        <Globe3D />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="mb-8">
            <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4">
              BUILT FOR SCALE
            </p>
            <h2 className="text-5xl font-bold text-text-primary mb-6">
              <span className="text-brand-primary">Enterprise</span> grade
              <br />
              infrastructure
            </h2>
          </div>

          {/* Compliance badges */}
          <div className="flex items-center space-x-6 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-text-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-text-muted"></div>
              </div>
              <span className="text-text-secondary">GDPR</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-text-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-text-muted"></div>
              </div>
              <span className="text-text-secondary">HIPAA</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-text-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-text-muted"></div>
              </div>
              <span className="text-text-secondary">SOC 2 Type 2</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 mb-16">
            <div>
              <div className="text-4xl font-bold text-text-primary mb-2">99.99%</div>
              <div className="text-text-muted uppercase text-sm tracking-wider">UPTIME</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-text-primary mb-2">100ms</div>
              <div className="text-text-muted uppercase text-sm tracking-wider">GLOBAL LATENCY</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-text-primary mb-2">3 billion</div>
              <div className="text-text-muted uppercase text-sm tracking-wider">CALLS ANNUALLY</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-text-primary mb-2">100K+</div>
              <div className="text-text-muted uppercase text-sm tracking-wider">DEVELOPERS</div>
            </div>
          </div>

          {/* Customer section */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4">
              CHOSEN BY INNOVATORS
            </p>
            <h3 className="text-3xl font-bold text-text-primary mb-8">
              From <span className="text-brand-primary">startups</span> to <span className="text-brand-primary">industry giants</span>
            </h3>
          </div>

          <Button 
            variant="outline" 
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-background"
          >
            View all customers
          </Button>
        </div>
      </div>

      {/* Customer logos section */}
      <div className="mt-20 border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center text-text-muted mb-8">
            Powering billions of<br />calls in production for:
          </div>
          
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-text-muted font-bold text-xl">tinder</div>
            <div className="text-text-muted font-bold text-xl">Portola</div>
            <div className="text-text-muted font-bold text-xl">HeyGen</div>
            <div className="text-text-muted font-bold text-xl">11ElevenLabs</div>
            <div className="text-text-muted font-bold text-xl">ORACLE</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;