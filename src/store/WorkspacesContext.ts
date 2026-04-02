import { createContext } from "react";
import type { Workspace } from "../types/workspace";

export interface WorkspacesContextValue {
    workspaces: Workspace[];
    getWorkspaceById: (workspaceId: string) => Workspace | undefined;

    addWorkspace: (title: string) => void;
    updateWorkspace(workspaceId: string, newTitle: string): void;
    deleteWorkspace(workspaceId: string): void;

    addColumn: (workspaceId: string, title: string) => void;
    updateColumn(workspaceId: string, columnId: string, newTitle: string): void;
    deleteColumn(workspaceId: string, columnId: string): void;

    addTask: (workspaceId: string, columnId: string, title: string) => void;
    updateTask(workspaceId: string, columnId: string, taskId: string, newTitle: string): void;
    deleteTask(workspaceId: string, columnId: string, taskId: string): void;

    moveTask: (
        workspaceId: string,
        taskId: string,
        fromColumnId: string,
        direction: "left" | "right"
    ) => void;
    moveColumns: (
        workspaceId: string,
        columnId: string,
        direction: "left" | "right"
    ) => void;
}
export const WorkspacesContext = createContext<WorkspacesContextValue | null>(null);
