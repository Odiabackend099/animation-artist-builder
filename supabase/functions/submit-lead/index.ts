// Submit lead from Signup to n8n via HMAC, with CORS
// Requires secrets: HMAC_SECRET, N8N_URL, N8N_WEBHOOK_PATH

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-odia-signature",
};

async function hmacSHA256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

    const body = await req.json();

    const HMAC_SECRET = Deno.env.get("HMAC_SECRET");
    const N8N_URL = Deno.env.get("N8N_URL");
    const N8N_WEBHOOK_PATH = Deno.env.get("N8N_WEBHOOK_PATH");

    if (!HMAC_SECRET || !N8N_URL || !N8N_WEBHOOK_PATH) {
      console.error("Missing required secrets");
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

    const payload = JSON.stringify(body);
    const sig = await hmacSHA256Hex(HMAC_SECRET, payload);
    const target = `${N8N_URL}${N8N_WEBHOOK_PATH}`;

    const r = await fetch(target, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-odia-signature": sig,
      },
      body: payload,
    });

    let data: any = {};
    try {
      data = await r.json();
    } catch (_) {}

    return new Response(JSON.stringify({ ok: r.ok, status: r.status, data }), {
      status: r.status,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  } catch (e) {
    console.error("submit-lead error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
