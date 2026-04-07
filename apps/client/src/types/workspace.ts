import type { TaskColumn } from "./taskcolumn";

export interface Workspace {
  id: string;
  title: string;
    columns: TaskColumn[];
    userId?: string;
}
export interface WorkspacesState {
  workspaces: Workspace[];
  isLoading: boolean;
  error: string | null;

  fetchWorkspaces: () => Promise<void>;
  getWorkspaceById: (workspaceId: string) => Workspace | undefined;
  resetWorkspaces: () => void;

  addWorkspace: (title: string) => Promise<void>;
  updateWorkspace(workspaceId: string, newTitle: string): Promise<void>;
  deleteWorkspace(workspaceId: string): Promise<void>;

  addColumn: (workspaceId: string, title: string) => Promise<void>;
  updateColumn(
    workspaceId: string,
    columnId: string,
    newTitle: string,
  ): Promise<void>;
  deleteColumn(workspaceId: string, columnId: string): Promise<void>;

  addTask: (workspaceId: string, columnId: string, title: string) => Promise<void>;
  updateTask(
    workspaceId: string,
    columnId: string,
    taskId: string,
    newTitle: string,
  ): Promise<void>;
  deleteTask(workspaceId: string, columnId: string, taskId: string): Promise<void>;

  moveTask: (
    workspaceId: string,
    taskId: string,
    fromColumnId: string,
    direction: 'left' | 'right',
  ) => void;
  moveColumns: (
    workspaceId: string,
    columnId: string,
    direction: 'left' | 'right',
  ) => void;
}
