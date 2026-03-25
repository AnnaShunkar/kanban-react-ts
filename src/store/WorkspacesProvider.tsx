import { useState, type ReactNode } from "react";
import { mockWorkspaces } from "../data/mockData";
import { WorkspacesContext } from "./WorkspacesContext";
import type { Workspace } from "../types";

interface WorkspaceProviderProps {
    children: ReactNode;
}
export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
    const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);

    function getWorkspaceById(workspaceId: string) {
        return workspaces.find((workspace) => workspace.id === workspaceId);
    }

    function addWorkspace(title: string) {
        const newWorkspace: Workspace = {
            id: crypto.randomUUID(),
            title,
            columns: [],
        };
        setWorkspaces((prev) => [...prev, newWorkspace]);
    }

    function addColumn(workspaceId: string, title: string) {
        setWorkspaces((prev) => prev.map((workspace) => workspace.id === workspaceId ?
            {
                ...workspace,
                columns: [
                    ...workspace.columns,
                    { id: crypto.randomUUID(), title, tasks: [] },
                ],
            }
            : workspace
        )
        );
    }

    function addTask(workspaceId: string, columnId: string, title: string) {
        setWorkspaces((prev) =>
            prev.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                        ...workspace,
                        columns: workspace.columns.map((column) =>
                            column.id === columnId
                                ? {
                                    ...column,
                                    tasks: [
                                        ...column.tasks,
                                        { id: crypto.randomUUID(), title },
                                    ],
                                }
                                : column
                        ),
                    }
                    : workspace
            )
        );
    }
    return (
        <WorkspacesContext.Provider value={{ workspaces, getWorkspaceById, addWorkspace, addColumn, addTask }}>
            {children}
        </WorkspacesContext.Provider>
    )
}