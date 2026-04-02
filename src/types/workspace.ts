import type { TaskColumn } from "./taskcolumn";
export interface Workspace {
  id: string;
  title: string;
  columns: TaskColumn[];
}