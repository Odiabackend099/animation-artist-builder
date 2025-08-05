import { Button } from "@/components/ui/button";
import { PhoneInterface3D } from "@/components/3d/PhoneInterface3D";

const VoiceAISection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Tab navigation */}
            <div className="flex space-x-8 mb-12">
              <button className="text-brand-primary font-semibold pb-2 border-b-2 border-brand-primary">
                VOICE AI
              </button>
              <button className="text-text-muted font-semibold pb-2">
                ROBOTICS
              </button>
              <button className="text-text-muted font-semibold pb-2">
                LIVESTREAMING
              </button>
            </div>

            {/* Brand icons */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-surface-tertiary rounded border border-border flex items-center justify-center">
                <div className="w-6 h-6 bg-brand-primary rounded"></div>
              </div>
              <div className="w-10 h-10 bg-surface-tertiary rounded border border-border flex items-center justify-center">
                <div className="w-6 h-6 bg-brand-secondary rounded"></div>
              </div>
              <div className="w-10 h-10 bg-surface-tertiary rounded border border-border flex items-center justify-center">
                <div className="w-6 h-6 bg-brand-accent rounded"></div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              LiveKit Cloud powers ChatGPT's Advanced Voice Mode for millions of users around the world, every day.
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-surface-tertiary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                </div>
                <span className="text-text-secondary">Run millions of concurrent calls</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-surface-tertiary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                </div>
                <span className="text-text-secondary">Automatic turn detection and interruption handling</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-surface-tertiary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                </div>
                <span className="text-text-secondary">Self-host or deploy agents to LiveKit Cloud</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="border-border text-text-primary hover:bg-surface-tertiary"
            >
              Contact sales
            </Button>
          </div>

          {/* Right side - Advanced 3D Phone interface */}
          <div className="relative h-96">
            <PhoneInterface3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAISection;