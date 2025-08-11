import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorksSection = () => {
  const navigate = useNavigate();
  return (
    <section id="how-it-works" className="py-32 bg-surface-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl font-bold text-brand-primary mb-12">
              Running in 3 Minutes
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-background flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Connect Your WhatsApp Business
                  </h3>
                  <p className="text-text-secondary">
                    Link your business number. Keep your existing number.
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
                    Train Your AI Team
                  </h3>
                  <p className="text-text-secondary">Tell them about your business. They learn instantly.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-background flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Go Live Immediately
                  </h3>
                  <p className="text-text-secondary">Customers talk to Lexi. You get insights from Agent ODIA.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button 
                variant="outline" 
                className="border-border text-text-primary hover:bg-surface-tertiary"
                onClick={() => navigate('/auth')}
              >
                Start Free 3-Day Trial
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-text-secondary hover:text-text-primary"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Right side - 3D Isometric diagram */}
          <div className="relative">
            <div className="w-full max-w-lg mx-auto">
              {/* Isometric container */}
              <div className="relative h-96 perspective-1000">
                {/* Client device */}
                <div className="absolute bottom-0 left-8 w-32 h-48 transform rotate-y-12 rotate-x-12">
                  <div className="w-full h-full bg-surface-tertiary border border-brand-primary/30 rounded-lg relative">
                    <div className="absolute top-4 left-4 right-4 h-16 bg-gradient-primary rounded opacity-80"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-text-muted">
                      WHATSAPP BUSINESS
                    </div>
                  </div>
                  {/* Step 1 label */}
                  <div className="absolute -top-8 left-0 text-xs text-brand-primary font-semibold">
                    STEP 1
                  </div>
                </div>

                {/* LiveKit Cloud */}
                <div className="absolute top-16 right-8 w-40 h-32 transform rotate-y-12 rotate-x-12">
                  <div className="w-full h-full bg-surface-tertiary border border-brand-primary/30 rounded-lg relative">
                    <div className="absolute inset-2 bg-brand-primary/20 rounded flex items-center justify-center">
                      <div className="text-xs text-text-primary font-semibold text-center">
                        ODIA<br />CLOUD
                      </div>
                    </div>
                  </div>
                  {/* Step 2 label */}
                  <div className="absolute -top-8 left-0 text-xs text-brand-primary font-semibold">
                    STEP 2
                  </div>
                </div>

                {/* Agent */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-36 rotate-y-12 rotate-x-12">
                  <div className="w-full h-full bg-surface-tertiary border border-brand-primary/30 rounded-lg relative">
                    <div className="absolute inset-2 bg-gradient-primary rounded flex items-center justify-center">
                      <div className="text-xs text-background font-semibold">LEXI</div>
                    </div>
                  </div>
                  {/* Step 3 label */}
                  <div className="absolute -top-8 left-0 text-xs text-brand-primary font-semibold">
                    STEP 3
                  </div>
                </div>

                {/* User */}
                <div className="absolute bottom-12 right-0 w-24 h-32 transform rotate-y-12 rotate-x-12">
                  <div className="w-full h-full bg-surface-tertiary border border-brand-primary/30 rounded-lg relative">
                    <div className="absolute top-2 left-2 right-2 h-8 bg-text-muted rounded-full"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-text-muted">
                      BUSINESS OWNER
                    </div>
                  </div>
                  {/* Step 4 label */}
                  <div className="absolute -bottom-8 left-0 text-xs text-brand-primary font-semibold">
                    STEP 4
                  </div>
                </div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--brand-primary))" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(var(--brand-primary))" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated connection paths */}
                  <path
                    d="M 80 320 Q 200 200 280 180"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                  
                  <path
                    d="M 280 180 Q 200 100 180 80"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse delay-500"
                  />
                  
                  <path
                    d="M 180 80 Q 300 150 360 240"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse delay-1000"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;