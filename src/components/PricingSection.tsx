import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-primary">Simple Nigerian Pricing</h2>
          <p className="text-text-secondary mt-2">No hidden fees. Pay monthly. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="p-6 rounded-lg border border-border bg-surface-tertiary">
            <h3 className="text-2xl font-semibold text-text-primary mb-2">Starter</h3>
            <div className="text-3xl font-bold text-text-primary mb-4">₦20,000<span className="text-base font-normal text-text-secondary">/month</span></div>
            <ul className="text-text-secondary space-y-2 mb-6">
              <li>• Agent Lexi for customer service</li>
              <li>• 1,000 messages per month</li>
              <li>• WhatsApp integration</li>
              <li>• Basic analytics</li>
            </ul>
            <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={() => navigate('/auth?plan=starter')}>Start Free Trial</Button>
            <p className="text-xs text-text-muted mt-3">Add Agent ODIA to Starter: +₦10,000/month</p>
          </div>

          {/* Business - Popular */}
          <div className="p-6 rounded-lg border border-brand-primary bg-surface-tertiary relative">
            <span className="absolute -top-3 right-4 text-xs bg-brand-primary text-background px-2 py-1 rounded">Most Popular</span>
            <h3 className="text-2xl font-semibold text-text-primary mb-2">Business</h3>
            <div className="text-3xl font-bold text-text-primary mb-4">₦50,000<span className="text-base font-normal text-text-secondary">/month</span></div>
            <ul className="text-text-secondary space-y-2 mb-6">
              <li>• Agent Lexi for customers</li>
              <li>• Agent ODIA for business intelligence</li>
              <li>• Unlimited messages</li>
              <li>• Voice note support</li>
              <li>• Priority support</li>
              <li>• Revenue tracking</li>
            </ul>
            <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={() => navigate('/auth?plan=business')}>Start Free Trial</Button>
          </div>

          {/* Enterprise */}
          <div className="p-6 rounded-lg border border-border bg-surface-tertiary">
            <h3 className="text-2xl font-semibold text-text-primary mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-text-primary mb-4">₦150,000<span className="text-base font-normal text-text-secondary">/month</span></div>
            <ul className="text-text-secondary space-y-2 mb-6">
              <li>• Everything in Business</li>
              <li>• Custom AI training</li>
              <li>• Multiple phone numbers</li>
              <li>• API access</li>
              <li>• Dedicated success manager</li>
              <li>• Custom integrations</li>
            </ul>
            <Button variant="outline" className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-background" onClick={() => window.open('https://wa.me/2348105786326?text=Hello%20ODIA%20Sales%2C%20I%27d%20like%20to%20discuss%20the%20Enterprise%20plan.', '_blank')}>Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
