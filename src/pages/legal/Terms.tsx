export default function Terms() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <article className="prose prose-invert max-w-3xl mx-auto">
        <h1>Terms of Service</h1>
        <p>Effective: {new Date().toISOString().slice(0,10)}</p>
        <h2>Agreement</h2>
        <p>These terms govern your use of ODIA AI services.</p>
        <h2>Trials & Usage Caps</h2>
        <p>Free demos include message/time limits. Abuse may lead to suspension.</p>
        <h2>Data</h2>
        <p>We store minimum data needed and purge expired demos (30 days).</p>
        <h2>Payments</h2>
        <p>Subscriptions billed monthly; cancel anytime.</p>
        <h2>Liability</h2>
        <p>Service provided “as is”.</p>
        <h2>Contact</h2>
        <p>support@odia.dev</p>
      </article>
    </main>
  );
}
