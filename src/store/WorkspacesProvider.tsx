import { useState, type ReactNode } from "react";
import { mockWorkspaces } from "../data/mockData";
import { WorkspacesContext } from "./WorkspacesContext";
import type { Workspace } from "../types";
import { moveTask } from "../utils/tasks";

interface WorkspacesProviderProps {
    children: ReactNode;
}

export function WorkspacesProvider({ children }: WorkspacesProviderProps) {
    const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);

    function getWorkspaceById(workspaceId: string): Workspace | undefined {
        return workspaces.find((workspace) => workspace.id === workspaceId);
    }

    function addWorkspace(title: string): void {
        const newWorkspace: Workspace = {
            id: crypto.randomUUID(),
            title,
            columns: [],
        };
        setWorkspaces((prev) => [...prev, newWorkspace]);
    }

    const addColumn = (workspaceId: string, title: string): void => {
        setWorkspaces((prev) => prev.map((workspace) => workspace.id === workspaceId
            ? {
                ...workspace,
                columns: [
                    ...workspace.columns,
                    { id: crypto.randomUUID(), title, tasks: [] },
                ],
            }
            : workspace)
        );
    }


    function addTask(workspaceId: string, columnId: string, title: string): void {
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

    function moveTaskHandler(
        workspaceId: string,
        taskId: string,
        fromColumnId: string,
        direction: "left" | "right"
    ): void {
        setWorkspaces((prev) =>
            moveTask(prev, workspaceId, taskId, fromColumnId, direction)
        );
    }

    return (
        <WorkspacesContext.Provider
            value={{ workspaces, getWorkspaceById, addWorkspace, addColumn, addTask, moveTask: moveTaskHandler }}
        >
            {children}
        </WorkspacesContext.Provider>
    )
}
