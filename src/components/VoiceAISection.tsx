import { Button } from "@/components/ui/button";

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

          {/* Right side - Mobile interface mockup */}
          <div className="relative">
            <div className="w-full max-w-sm mx-auto">
              {/* Phone mockup */}
              <div className="relative w-80 h-[600px] bg-black rounded-[3rem] p-4 mx-auto">
                {/* Screen */}
                <div className="w-full h-full bg-surface-primary rounded-[2.5rem] relative overflow-hidden">
                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-surface-secondary flex items-center justify-between px-6 text-xs text-text-muted">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 border border-text-muted rounded-sm">
                        <div className="w-3 h-1 bg-text-muted rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="pt-12 pb-6 px-6 h-full flex flex-col">
                    {/* AI Avatar */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-primary animate-glow-pulse"></div>
                        {/* Animated rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 animate-ping"></div>
                        <div className="absolute inset-2 rounded-full border border-brand-primary/20 animate-pulse delay-500"></div>
                      </div>
                    </div>

                    {/* AI Info */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-text-primary mb-2">Vale</h3>
                      <p className="text-text-secondary">Bright and inquisitive</p>
                      
                      {/* Status dots */}
                      <div className="flex justify-center space-x-2 mt-4">
                        {[...Array(9)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${
                              i < 3 ? 'bg-brand-primary' : 'bg-surface-tertiary'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-white text-black hover:bg-gray-100 rounded-full py-4 text-lg font-semibold"
                    >
                      Start a new chat
                    </Button>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAISection;