import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";
import { IsometricDiagram3D } from "@/components/3d/IsometricDiagram3D";

const HowItWorksSection = () => {
  return (
    <section className="py-32 bg-surface-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl font-bold text-brand-primary mb-12">
              How it works
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-background flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    User speaks to agent via app, browser, or phone call
                  </h3>
                  <p className="text-text-secondary">
                    Voice data is captured via LiveKit SDK on any major platform, or SIP trunk.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-background flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    User speech is streamed from device to agent via LiveKit Cloud
                  </h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-background flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Agent receives user speech and runs your custom business logic
                  </h3>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-background flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Agent generates and streams speech back to user via LiveKit Cloud
                  </h3>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button 
                variant="outline" 
                className="border-border text-text-primary hover:bg-surface-tertiary"
              >
                <FileText className="w-4 h-4 mr-2" />
                View documentation
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-text-secondary hover:text-text-primary"
              >
                <Github className="w-4 h-4 mr-2" />
                livekit/agents
                <span className="ml-2 text-xs bg-surface-tertiary px-2 py-1 rounded">6.8K</span>
              </Button>
            </div>
          </div>

          {/* Right side - Advanced 3D Isometric diagram */}
          <div className="relative h-96">
            <IsometricDiagram3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;