import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { listId, tasks } = data;
  const supabase = await createSupabaseServerClient();
  await supabase.from("todos").delete().eq("list_id", listId);
  await supabase.from("todos").insert(
    tasks.map((task: any) => ({
      created_by: task.createdBy,
      title: task.title,
      isDone: task.isDone,
      list_id: task.listId,
      dueDate: task.dueDate,
    }))
  );
  return Response.json({ message: "Hello from Next.js!" });
}
