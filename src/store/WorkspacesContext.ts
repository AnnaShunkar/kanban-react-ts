import { createContext } from "react";
import type { Workspace } from "../types";

export interface WorkspacesContextValue {
    workspaces: Workspace[];
    getWorkspaceById: (workspaceId: string) => Workspace | undefined;
    addWorkspace: (title: string) => void;
    addColumn: (workspaceId: string, title: string) => void;
    addTask: (workspaceId: string,columnId: string, title: string) => void;
}
export const WorkspacesContext = createContext<WorkspacesContextValue | null>(null);
