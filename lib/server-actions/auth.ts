"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../supabase/server";
import { Client } from "@/models/index";

export async function signUpWithEmailAndPassword(
  payload: Client.Auth.SignUpPayload
) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: { data: { username: payload.username } },
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(
  payload: Client.Auth.SignInPayload
) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
  return JSON.stringify(result);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
