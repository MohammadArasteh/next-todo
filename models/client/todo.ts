export type TodoList = {
  id: number;
  title: string;
  createdBy: string;
};

export type TodoTask = {
  id: number;
  listId: number;
  createdBy: string;
  createdAt: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

export type CreateTodoListPayload = Omit<TodoList, "id" | "createdBy">;
