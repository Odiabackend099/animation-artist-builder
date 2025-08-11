import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || undefined;
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectUrl = useMemo(() => {
    const qp = plan ? `?plan=${encodeURIComponent(plan)}` : "";
    return `${window.location.origin}/signup${qp}`;
  }, [plan]);

  useEffect(() => {
    // Redirect if already logged in
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Defer navigation to avoid deadlocks
        setTimeout(() => navigate(`/signup${plan ? `?plan=${plan}` : ""}`), 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate(`/signup${plan ? `?plan=${plan}` : ""}`);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [navigate, plan]);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) throw error;
      toast({ title: "Check your email", description: "Confirm your email to continue." });
    } catch (e: any) {
      toast({ title: "Sign up failed", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate(`/signup${plan ? `?plan=${plan}` : ""}`);
    } catch (e: any) {
      toast({ title: "Sign in failed", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-surface-primary border border-border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-text-primary mb-1">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <p className="text-text-secondary mb-6">Start your 3-day free trial.</p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <Button variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>Sign up</Button>
          <Button variant={mode === "signin" ? "default" : "outline"} onClick={() => setMode("signin")}>Sign in</Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-background" onClick={mode === "signup" ? handleSignUp : handleSignIn} disabled={loading}>
            {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </Button>
        </div>

        <p className="text-xs text-text-muted mt-4">By continuing you agree to our Terms and Privacy.</p>
      </div>
    </main>
  );
};

export default Auth;
