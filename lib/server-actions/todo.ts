"use server";

import { signOut } from "./auth";
import { createSupabaseServerClient } from "../supabase/server";
import { Client } from "@/models/index";

export async function createList(payload: Client.Todo.CreateTodoListPayload) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const result = await supabase
      .from("list")
      .insert({
        title: payload.title,
        created_by: data.user.id,
      })
      .select()
      .single();
    return JSON.stringify(result);
  } else {
    signOut();
    return JSON.stringify({ error: { message: "user not found" } });
  }
}

export async function getLists() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const result = await supabase
      .from("list")
      .select("*")
      .eq("created_by", data.user.id);
    return JSON.stringify(result);
  } else {
    signOut();
    return JSON.stringify({ error: { message: "user not found" } });
  }
}

export async function getList(id: number) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("list").select("*").eq("id", id).single();
  return JSON.stringify(result);
}

export async function deleteList(id: Client.Todo.TodoList["id"]) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("list").delete().eq("id", id).select();
  await clearListTasks(id);
  return JSON.stringify(result);
}
export async function clearListTasks(id: Client.Todo.TodoList["id"]) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("todos").delete().eq("list_id", id);
  return JSON.stringify(result);
}

export async function getListTasks(id: Client.Todo.TodoList["id"]) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("todos").select().eq("list_id", id);
  return JSON.stringify(result);
}
export async function saveListLocalTasks(
  listId: Client.Todo.TodoList["id"],
  tasks: Array<Client.Todo.TodoTask>
) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("todos").delete().eq("list_id", listId);
  await supabase.from("todos").insert(
    tasks.map((task) => ({
      created_by: task.createdBy,
      title: task.title,
      isDone: task.isDone,
      list_id: task.listId,
      dueDate: task.dueDate,
    }))
  );
  return "OK";
}
