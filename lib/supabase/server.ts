import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

function makeCookieHandlers(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
      try {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      } catch {}
    },
  };
}

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error("Missing Supabase environment variables (URL or Anon Key)");
  }

  const cookieStore = await cookies();
  return createServerClient(url, key, { cookies: makeCookieHandlers(cookieStore) });
}

export async function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) {
    throw new Error("Missing Supabase environment variables (URL or Service Role Key)");
  }

  const cookieStore = await cookies();
  return createServerClient(url, key, { cookies: makeCookieHandlers(cookieStore) });
}
