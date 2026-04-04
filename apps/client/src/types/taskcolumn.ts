import type { Task } from "./task";
export type TaskColumn = {
  id: string;
  title: string;
  tasks: Task[];
}