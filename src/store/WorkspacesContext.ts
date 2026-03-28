import { createContext } from "react";
import type { Workspace } from "../types";

export interface WorkspacesContextValue {
    workspaces: Workspace[];
    getWorkspaceById: (workspaceId: string) => Workspace | undefined;
    addWorkspace: (title: string) => void;
    addColumn: (workspaceId: string, title: string) => void;
    addTask: (workspaceId: string, columnId: string, title: string) => void;
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
