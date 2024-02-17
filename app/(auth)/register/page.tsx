import { readUserSession } from "@/lib/server-actions";
import RegisterForm from "@/components/registerForm";
import { redirect } from "next/navigation";

export default async function Register() {
  const { data } = await readUserSession();
  if (data.session) redirect("/dashboard");
  return <RegisterForm />;
}
