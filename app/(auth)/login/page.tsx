import { readUserSession } from "@/lib/server-actions";
import LoginForm from "@/components/loginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const { data } = await readUserSession();
  if (data.session) redirect("/dashboard");
  return <LoginForm />;
}
