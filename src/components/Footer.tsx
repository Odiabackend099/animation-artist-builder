import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NAV } from "@/lib/nav";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-surface-primary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* Left side - Company info */}
          <div>
            <a href={NAV.home} className="text-2xl font-bold text-text-primary mb-6 inline-block">
              ODIA
            </a>
            <p className="text-text-secondary mb-8 max-w-md">
              Agent Lexi serves your customers. Agent ODIA reports to you.
              <br />
              Two AI staff working 24/7 for your business.
            </p>
            
            <Button 
              className="bg-brand-primary hover:bg-brand-primary/90 text-background mb-8"
              onClick={() => navigate(NAV.routes.auth)}
            >
              Start Free Trial
            </Button>
            
            <p className="text-text-muted text-sm">
              No credit card required • Setup in 3 minutes
            </p>

            {/* Social links */}
            <div className="mt-8">
              <p className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-4">
                KEEP IN TOUCH
              </p>
              <div className="flex space-x-4">
                <a href={NAV.external.github} target="_blank" rel="noreferrer" className="w-8 h-8 bg-surface-tertiary rounded flex items-center justify-center hover:bg-surface-secondary transition-colors">
                  <Github className="w-4 h-4 text-text-secondary" />
                </a>
                <a href={NAV.external.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 bg-surface-tertiary rounded flex items-center justify-center hover:bg-surface-secondary transition-colors">
                  <Twitter className="w-4 h-4 text-text-secondary" />
                </a>
                <a href={NAV.external.contactSales} target="_blank" rel="noreferrer" className="w-8 h-8 bg-surface-tertiary rounded flex items-center justify-center hover:bg-surface-secondary transition-colors">
                  <div className="w-4 h-4 bg-text-secondary rounded" />
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product */}
            <div>
              <h4 className="text-text-primary font-semibold mb-4 uppercase text-sm tracking-wider">
                PRODUCT
              </h4>
              <ul className="space-y-3">
                <li><a href={NAV.sections.howItWorks} className="text-text-secondary hover:text-text-primary transition-colors">Agents</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Media server</a></li>
                <li><a href={NAV.sections.pricing} className="text-text-secondary hover:text-text-primary transition-colors">SDKs</a></li>
                <li><a href={NAV.sections.pricing} className="text-text-secondary hover:text-text-primary transition-colors">Cloud dashboard</a></li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h4 className="text-text-primary font-semibold mb-4 uppercase text-sm tracking-wider">
                DEVELOPERS
              </h4>
              <ul className="space-y-3">
                <li><a href={NAV.sections.howItWorks} className="text-text-secondary hover:text-text-primary transition-colors">Documentation</a></li>
                <li><a href={NAV.sections.howItWorks} className="text-text-secondary hover:text-text-primary transition-colors">Security</a></li>
                <li><a href={NAV.sections.howItWorks} className="text-text-secondary hover:text-text-primary transition-colors">LLMs.txt</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-text-primary font-semibold mb-4 uppercase text-sm tracking-wider">
                RESOURCES
              </h4>
              <ul className="space-y-3">
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Brand assets</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Video codecs</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Codec bitrates</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">WebRTC browser test</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Connection test</a></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-text-primary font-semibold mb-4 uppercase text-sm tracking-wider">
                SOLUTIONS
              </h4>
              <ul className="space-y-3">
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Robotics</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Livestreaming</a></li>
                <li><a href={NAV.sections.testimonials} className="text-text-secondary hover:text-text-primary transition-colors">Video conferencing</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
            <div className="mb-4 md:mb-0">
              © 2025 ODIA. Engineered and designed worldwide. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href={NAV.routes.terms} className="hover:text-text-secondary transition-colors">Terms of Service</a>
              <a href={NAV.routes.privacy} className="hover:text-text-secondary transition-colors">Cookie Policy</a>
              <a href={NAV.routes.privacy} className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;