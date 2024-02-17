import { create } from "zustand";
import { Client } from "../models";

type User = {
  id: string;
  username: string;
  email: string;
};

type TodoStore = {
  lists: Array<Client.Todo.TodoList>;
  localTasks: Record<
    Client.Todo.TodoList["id"],
    Array<Client.Todo.TodoTask> | undefined
  >;
  filteredLists: Array<Client.Todo.TodoList["id"]>;
  changedListsIds: Array<Client.Todo.TodoList["id"]>;
  checkpoint?: boolean;
  user: User | null;
  setLists: (lists: Array<Client.Todo.TodoList>) => void;
  addList: (list: Client.Todo.TodoList) => void;
  removeList: (id: Client.Todo.TodoList["id"]) => void;
  setTasks: (
    listId: Client.Todo.TodoList["id"],
    tasks: Array<Client.Todo.TodoTask>,
    markAsChanged?: boolean
  ) => void;
  addTask: (task: Client.Todo.TodoTask) => void;
  removeTask: (
    listId: Client.Todo.TodoList["id"],
    id: Client.Todo.TodoTask["id"]
  ) => void;
  toggleTaskStatus: (
    listId: Client.Todo.TodoList["id"],
    id: Client.Todo.TodoTask["id"]
  ) => void;
  setUser: (user: User) => void;
  toggleListFilter: (listId: Client.Todo.TodoList["id"]) => void;
};

export const useTodoList = create<TodoStore>((set) => ({
  lists: [],
  localTasks: {},
  filteredLists: [],
  changedListsIds: [],
  checkpoint: false,
  user: null,
  setLists(lists) {
    set(() => ({ lists, changedListsIds: [] }));
  },
  addList(list) {
    set((state) => ({
      lists: [...state.lists, list],
      changedListsIds: state.changedListsIds.filter((i) => i !== list.id),
    }));
  },
  removeList(id) {
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
      changedListsIds: state.changedListsIds.filter((i) => i !== id),
    }));
  },
  setTasks(listId, tasks, markAsChanged) {
    set((state) => ({
      localTasks: { ...state.localTasks, [listId]: tasks },
      changedListsIds: markAsChanged
        ? [...state.changedListsIds, listId]
        : state.changedListsIds.filter((id) => id !== listId),
    }));
  },
  addTask(task) {
    set((state) => ({
      localTasks: {
        ...state.localTasks,
        [task.listId]: [...(state.localTasks[task.listId] ?? []), task],
      },
      changedListsIds: state.changedListsIds.includes(task.listId)
        ? state.changedListsIds
        : [...state.changedListsIds, task.listId],
    }));
  },
  removeTask(listId, id) {
    set((state) => ({
      localTasks: {
        ...state.localTasks,
        [listId]: (state.localTasks[listId] ?? []).filter(
          (task) => task.id !== id
        ),
      },
      changedListsIds: state.changedListsIds.includes(listId)
        ? state.changedListsIds
        : [...state.changedListsIds, listId],
    }));
  },
  toggleTaskStatus(listId, id) {
    set((state) => ({
      localTasks: {
        ...state.localTasks,
        [listId]: (state.localTasks[listId] ?? []).reduce(
          (acc, current) =>
            current.id === id
              ? [...acc, { ...current, isDone: !current.isDone }]
              : [...acc, current],
          [] as Array<Client.Todo.TodoTask>
        ),
      },
      changedListsIds: state.changedListsIds.includes(listId)
        ? state.changedListsIds
        : [...state.changedListsIds, listId],
    }));
  },
  setUser(user) {
    set(() => ({
      user,
    }));
  },
  toggleListFilter(listId) {
    set((state) => ({
      filteredLists: state.filteredLists.includes(listId)
        ? state.filteredLists.filter((id) => id !== listId)
        : [...state.filteredLists, listId],
    }));
  },
}));
