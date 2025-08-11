export default function Privacy() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <article className="prose prose-invert max-w-3xl mx-auto">
        <h1>Privacy Policy</h1>
        <p>We respect your privacy and protect your data (NDPR aligned).</p>
        <h2>What We Collect</h2>
        <ul><li>Name, email, WhatsApp number, and business info for provisioning.</li></ul>
        <h2>How We Use It</h2>
        <ul><li>Provision your agent, send status updates, improve service.</li></ul>
        <h2>Storage & Retention</h2>
        <p>Data stored in Supabase; demo data purged after 30 days.</p>
        <h2>Security</h2>
        <p>RLS on DB, secrets server-side, no client exposure of keys.</p>
        <h2>Your Rights</h2>
        <p>Request deletion via support@odia.dev</p>
      </article>
    </main>
  );
}
