// Query v_lead_status by email using service role, with CORS
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "*";
const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
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

const authHeader = req.headers.get("Authorization") ?? "";
const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
if (!token) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase service credentials");
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Derive email from JWT instead of trusting the client
const { data: userRes, error: userErr } = await sb.auth.getUser(token);
if (userErr || !userRes?.user?.email) {
  console.error("lead-status auth error", userErr?.message);
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}
const email = userRes.user.email;

const { data, error } = await sb
  .from("v_lead_status")
  .select("status, agent_slug, delivery_summary, created_at")
  .eq("email", email)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

    if (error) {
      console.error("lead-status query error", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

return new Response(JSON.stringify({ status: data?.status ?? null, agent_slug: data?.agent_slug ?? null, delivery_summary: data?.delivery_summary ?? null }), {
  status: 200,
  headers: { ...corsHeaders, "content-type": "application/json" },
});
  } catch (e) {
    console.error("lead-status error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
