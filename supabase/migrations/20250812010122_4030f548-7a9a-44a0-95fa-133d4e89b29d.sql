-- SECURITY MIGRATION: tighten RLS and function privileges

-- 1) Leads: restrict INSERT to service_role only
DROP POLICY IF EXISTS "leads_insert" ON public.leads;
CREATE POLICY "leads_insert_service"
ON public.leads
FOR INSERT
TO public
WITH CHECK (auth.role() = 'service_role');

-- 2) Users: restrict INSERT to authenticated users creating their own row
DROP POLICY IF EXISTS "Anyone can create user account" ON public.users;
CREATE POLICY "Users can create their own account"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- 3) Enforce unique emails on users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'users_email_unique'
  ) THEN
    ALTER TABLE public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
  END IF;
END $$;

-- 4) Lock down admin-like functions so clients can't call them directly via RPC
DO $$
BEGIN
  -- increment_user_usage(uuid)
  BEGIN
    REVOKE EXECUTE ON FUNCTION public.increment_user_usage(uuid) FROM PUBLIC, anon, authenticated;
  EXCEPTION WHEN undefined_function THEN
    -- ignore if function doesn't exist
    NULL;
  END;

  -- increment_user_api_usage(uuid)
  BEGIN
    REVOKE EXECUTE ON FUNCTION public.increment_user_api_usage(uuid) FROM PUBLIC, anon, authenticated;
  EXCEPTION WHEN undefined_function THEN
    NULL;
  END;

  -- reset_monthly_usage()
  BEGIN
    REVOKE EXECUTE ON FUNCTION public.reset_monthly_usage() FROM PUBLIC, anon, authenticated;
  EXCEPTION WHEN undefined_function THEN
    NULL;
  END;
END $$;