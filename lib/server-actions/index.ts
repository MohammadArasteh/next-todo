"use server";

import { createSupabaseServerClient } from "lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export async function readUserSession() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getUser();
}
