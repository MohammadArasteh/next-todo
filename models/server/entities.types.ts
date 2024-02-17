import { Database } from "./database.types";

export type ServerSideTodoList = Database["public"]["Tables"]["list"]["Row"];
export type ServerSideTodoTask = Database["public"]["Tables"]["todos"]["Row"];
