import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
const Dashboard = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [agentSlug, setAgentSlug] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      const email = user?.email;
      if (!email) return;
      const { data, error } = await supabase.functions.invoke('lead-status', { body: { email } });
      if (!mounted) return;
      if (error) {
        console.error('lead-status error', error);
      } else if (data) {
        setStatus((data as any).status ?? null);
        setAgentSlug((data as any).agent_slug ?? null);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const quick = [
    { label: "View Conversations" },
    { label: "Update AI Training" },
    { label: "Download Report" },
    { label: "Upgrade Plan" },
  ];
  return (
    <main className="min-h-screen bg-background pt-28 pb-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-text-primary">AI Team Performance</h1>
        <p className="text-text-secondary mb-8">Real-time insights from your AI staff</p>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Messages Handled Today", value: "128" },
            { label: "Active Conversations", value: "36" },
            { label: "Revenue Generated", value: "₦245,000" },
            { label: "Customer Satisfaction", value: "94%" },
          ].map((m) => (
            <Card key={m.label} className="border-border bg-surface-primary">
              <CardHeader>
                <CardTitle className="text-sm text-text-muted">{m.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text-primary">{m.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-surface-primary mb-10">
          <CardHeader>
            <CardTitle className="text-text-primary">Agent Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-text-secondary">
              Status: <span className="text-text-primary font-medium">{status ?? '—'}</span>
            </div>
            <div className="text-text-secondary">
              Agent Slug: <span className="text-text-primary font-medium">{agentSlug ?? '—'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-surface-primary mb-10">
          <CardHeader>
            <CardTitle className="text-text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-text-secondary">
              <li>🟢 Lexi handled price inquiry from +234...</li>
              <li>💰 New order confirmed: ₦15,000</li>
              <li>📊 Agent ODIA: "Sales up 25% vs yesterday"</li>
              <li>⚡ Response time: 2 seconds average</li>
            </ul>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {quick.map((q) => (
              <Button key={q.label} variant="outline" className="border-border" onClick={() => toast({ title: q.label, description: "Action executed." })}>
                {q.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
