import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const businessTypes = [
  "Restaurant/Food",
  "Fashion/Retail",
  "Healthcare/Pharmacy",
  "Real Estate",
  "Education",
  "Professional Services",
  "E-commerce",
  "Other",
];

const Signup = () => {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const preselectedPlan = (searchParams.get("plan") || "starter").toLowerCase();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [yourName, setYourName] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [businessType, setBusinessType] = useState<string | undefined>(undefined);

  const [plan, setPlan] = useState<string>(preselectedPlan);

  const [services, setServices] = useState("");
  const [hours, setHours] = useState("");
  const [delivery, setDelivery] = useState("");
  const [instructions, setInstructions] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate(`/auth${preselectedPlan ? `?plan=${preselectedPlan}` : ""}`);
      }
    });
  }, [navigate, preselectedPlan]);

  const upsertUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase.from("users").upsert(
      {
        id: user.id,
        email: user.email,
        company_name: companyName,
        phone: whatsAppNumber,
        business_type: (businessType || "other").toLowerCase(),
      },
      { onConflict: "id" }
    );
    if (error) throw error;

    // Profile display name
    const { error: pErr } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        display_name: yourName,
      },
      { onConflict: "user_id" }
    );
    if (pErr) throw pErr;
  };

  const savePlan = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    const mapped = plan === "business" ? "business" : plan === "enterprise" ? "enterprise" : "starter";
    const { error } = await supabase.from("users").update({ subscription_tier: mapped }).eq("id", user.id);
    if (error) throw error;
  };

  const saveTraining = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    const training = {
      services,
      hours,
      delivery,
      instructions,
      saved_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("profiles").update({ bio: JSON.stringify(training) }).eq("user_id", user.id);
    if (error) throw error;
  };

  const handleContinueStep1 = async () => {
    setLoading(true);
    try {
      await upsertUser();
      setStep(2);
      toast({ title: "Saved", description: "Business info saved." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleContinueStep2 = async () => {
    setLoading(true);
    try {
      await savePlan();
      setStep(3);
      toast({ title: "Plan selected", description: `Plan set to ${plan}.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = async () => {
    setLoading(true);
    try {
      await saveTraining();

      // Submit lead to backend for provisioning via Edge Function
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email || "";
      const payload = {
        name: yourName || email.split("@")[0],
        email,
        whatsapp: whatsAppNumber,
        business_name: companyName,
        industry: businessType || "Other",
        intent: "Sales & Support on WhatsApp",
        language: "en-NG",
        telegram: "",
      };

      const { error } = await supabase.functions.invoke("submit-lead", { body: payload });
      if (error) {
        console.error("submit-lead error", error);
        toast({ title: "Submitted with warnings", description: "We saved your setup but couldn't contact our provisioning service. We'll retry shortly." });
      } else {
        toast({ title: "AI Team Launched", description: "Provisioning started. Redirecting to dashboard..." });
      }

      navigate("/dashboard");
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary">{step === 1 ? "Let's Set Up Your AI Team" : step === 2 ? "Pick Your AI Team Size" : "Train Your AI Team in 60 Seconds"}</h1>
          <p className="text-text-secondary mt-2">{step === 1 ? "Tell us about your business (30 seconds)" : step === 2 ? "You can change this anytime" : "The more you tell them, the better they perform"}</p>
          <p className="text-text-muted text-sm mt-2">Step {step} of 3</p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-surface-primary border border-border rounded-lg p-6 space-y-5">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input placeholder="Your business name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Your Name</Label>
              <Input placeholder="Your full name" value={yourName} onChange={(e) => setYourName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Business Number</Label>
              <Input placeholder="+234 XXX XXX XXXX" value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Business Type</Label>
              <Select value={businessType} onValueChange={setBusinessType as any}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button className="bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={handleContinueStep1} disabled={loading}>
                {loading ? "Saving..." : "Continue"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-surface-primary border border-border rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { key: "starter", title: "Starter", price: "₦20,000/month", features: ["Agent Lexi", "1,000 messages", "WhatsApp integration", "Basic analytics"] },
                { key: "business", title: "Business", price: "₦50,000/month", badge: "Most Popular", features: ["Lexi + ODIA", "Unlimited messages", "Voice notes", "Priority support", "Revenue tracking"] },
                { key: "enterprise", title: "Enterprise", price: "₦150,000/month", features: ["Everything in Business", "Custom AI training", "Multiple numbers", "API access", "Dedicated success", "Custom integrations"] },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlan(p.key)}
                  className={`text-left p-4 rounded-lg border ${plan === p.key ? "border-brand-primary" : "border-border"} bg-surface-tertiary w-full`}
                >
                  {p.badge && <span className="text-xs bg-brand-primary text-background px-2 py-1 rounded">{p.badge}</span>}
                  <h3 className="text-xl font-semibold text-text-primary mt-2">{p.title}</h3>
                  <div className="text-text-secondary">{p.price}</div>
                  <ul className="text-text-secondary mt-3 space-y-1">
                    {p.features.map((f) => (<li key={f}>• {f}</li>))}
                  </ul>
                </button>
              ))}
            </div>

            <p className="text-text-muted text-sm mt-4">🎁 Everyone gets a 3-day free trial. No payment needed now.</p>

            <div className="flex justify-end mt-6">
              <Button className="bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={handleContinueStep2} disabled={loading}>
                {loading ? "Saving..." : "Continue to Setup"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-surface-primary border border-border rounded-lg p-6 space-y-5">
            <div className="space-y-2">
              <Label>What products/services do you offer?</Label>
              <Textarea placeholder="E.g., We sell women's fashion, shoes, and accessories" value={services} onChange={(e) => setServices(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>What are your business hours?</Label>
              <Input placeholder="E.g., Monday-Saturday, 9 AM - 7 PM" value={hours} onChange={(e) => setHours(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>What's your typical delivery time?</Label>
              <Input placeholder="E.g., Same day in Lagos, 2-3 days nationwide" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Any special instructions for your AI team?</Label>
              <Textarea placeholder="E.g., Always mention our 10% discount for first-time customers" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            </div>

            <div className="flex justify-end">
              <Button className="bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={handleLaunch} disabled={loading}>
                {loading ? "Launching..." : "Launch My AI Team"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Signup;
