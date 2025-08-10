import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-text-primary">
              ODIA
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="group relative">
                <button className="text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-1">
                  <span>Developers</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="group relative">
                <button className="text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-1">
                  <span>Company</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                Customers
              </a>
              
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                Pricing
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-text-secondary">
              <Github className="w-4 h-4" />
              <span className="text-sm">odia / dev</span>
              <span className="text-xs bg-surface-tertiary px-2 py-1 rounded">500+</span>
            </div>
            
            <Button variant="default" className="bg-brand-primary hover:bg-brand-primary/90 text-background">
              Start Free 3-Day Trial
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;