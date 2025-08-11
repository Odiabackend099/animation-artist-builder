import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InfrastructureSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background globe */}
      <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
        <div className="relative w-[500px] h-[500px]">
          {/* Globe wireframe */}
          <div className="absolute inset-0 rounded-full border border-brand-primary/20 animate-spin-slow">
            {/* Horizontal lines */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-b border-brand-primary/10"
                style={{
                  top: `${(i + 1) * 12.5}%`,
                  height: '1px'
                }}
              ></div>
            ))}
            
            {/* Vertical lines */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-r border-brand-primary/10"
                style={{
                  left: `${(i + 1) * 8.33}%`,
                  width: '1px'
                }}
              ></div>
            ))}
          </div>
          
          {/* Animated dots representing global presence */}
          {[...Array(20)].map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 180 + Math.random() * 60;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;
            
            return (
              <div
                key={`dot-${i}`}
                className="absolute w-3 h-3 bg-brand-primary rounded-full animate-glow-pulse"
                style={{
                  left: `calc(50% + ${x}px - 6px)`,
                  top: `calc(50% + ${y}px - 6px)`,
                  animationDelay: `${i * 100}ms`
                }}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="mb-8">
            <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4">
              THE PROBLEM
            </p>
            <h2 className="text-5xl font-bold text-text-primary mb-6">
              Nigerian Businesses Lose ₦2M Monthly to Poor Customer Service
            </h2>
          </div>

          {/* Problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-surface-tertiary border border-border rounded-lg">
              <h4 className="text-lg font-semibold text-text-primary mb-2">Missed WhatsApp Messages</h4>
              <p className="text-text-secondary">Customers message at midnight. You're asleep. Sale lost.</p>
            </div>
            <div className="p-6 bg-surface-tertiary border border-border rounded-lg">
              <h4 className="text-lg font-semibold text-text-primary mb-2">No Business Intelligence</h4>
              <p className="text-text-secondary">You don't know what customers really want until it's too late.</p>
            </div>
            <div className="p-6 bg-surface-tertiary border border-border rounded-lg">
              <h4 className="text-lg font-semibold text-text-primary mb-2">Can't Scale Support</h4>
              <p className="text-text-secondary">Hiring more staff is expensive. Training takes forever.</p>
            </div>
          </div>

          {/* Solution */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4">
              THE SOLUTION
            </p>
            <h3 className="text-3xl font-bold text-text-primary mb-6">Meet Your AI Team</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-2xl font-semibold text-text-primary mb-4">Agent Lexi (Customer-Facing)</h4>
              <ul className="space-y-3 text-text-secondary">
                <li>• Responds to every WhatsApp message instantly</li>
                <li>• Speaks perfect Nigerian English and Pidgin</li>
                <li>• Handles pricing, orders, complaints 24/7</li>
                <li>• Never loses patience, never takes breaks</li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-text-primary mb-4">Agent ODIA (Owner-Facing)</h4>
              <ul className="space-y-3 text-text-secondary">
                <li>• Monitors all customer conversations</li>
                <li>• Alerts you to opportunities and problems</li>
                <li>• Tracks revenue and customer patterns</li>
                <li>• Your personal business intelligence assistant</li>
              </ul>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-background"
            onClick={() => navigate('/auth')}
          >
            Start Free Trial
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