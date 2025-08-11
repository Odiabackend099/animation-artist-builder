import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NAV } from "@/lib/nav";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href={NAV.home} className="text-2xl font-bold text-text-primary">
              ODIA
            </a>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href={NAV.sections.howItWorks} className="text-text-secondary hover:text-text-primary transition-colors">
                Developers
              </a>
              <a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">
                Company
              </a>
              <a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">
                Customers
              </a>
              <a href={NAV.sections.pricing} className="text-text-secondary hover:text-text-primary transition-colors">
                Pricing
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <a href={NAV.external.github} target="_blank" rel="noreferrer" className="hidden md:flex items-center space-x-2 text-text-secondary">
              <Github className="w-4 h-4" />
              <span className="text-sm">odia / dev</span>
              <span className="text-xs bg-surface-tertiary px-2 py-1 rounded">500+</span>
            </a>
            
            <Button variant="default" className="bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={() => navigate(NAV.routes.auth)}>
              Start Free 3-Day Trial
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;