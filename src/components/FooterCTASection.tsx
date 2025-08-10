import { Button } from "@/components/ui/button";

const FooterCTASection = () => {
  return (
    <section className="py-24 bg-surface-primary border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">Your Competitors Are Already Using AI</h2>
        <p className="text-text-secondary mb-8">Don't get left behind. Try ODIA free for 3 days.</p>
        <div className="flex justify-center">
          <Button className="bg-brand-primary hover:bg-brand-primary/90 text-background text-lg px-8">Start Free Trial Now</Button>
        </div>
        <p className="text-text-muted text-sm mt-4">No credit card required • Setup in 3 minutes • Cancel anytime</p>
      </div>
    </section>
  );
};

export default FooterCTASection;
