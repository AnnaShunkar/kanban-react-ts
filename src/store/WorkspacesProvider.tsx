import { useState, type ReactNode } from "react";
import { mockWorkspaces } from "../data/mockData";
import { WorkspacesContext } from "./WorkspacesContext";
import type { Workspace } from "../types";

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

    function addColumn(workspaceId: string, title: string): void {
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

    function moveTask(
        workspaceId: string,
        taskId: string,
        fromColumnId: string,
        direction: "left" | "right"
    ): void {
        setWorkspaces((prev) =>
            prev.map((workspace) => {
                if (workspace.id !== workspaceId) {
                    return workspace;
                }

                const currentColumnIndex = workspace.columns.findIndex(
                    (column) => column.id === fromColumnId
                );

                if (currentColumnIndex === -1) {
                    return workspace;
                }

                const targetColumnIndex =
                    direction === "left" ? currentColumnIndex - 1 : currentColumnIndex + 1;

                if (targetColumnIndex < 0 || targetColumnIndex >= workspace.columns.length) {
                    return workspace;
                }

                const currentColumn = workspace.columns[currentColumnIndex];
                const taskToMove = currentColumn.tasks.find((task) => task.id === taskId);

                if (!taskToMove) {
                    return workspace;
                }

                const updatedColumns = workspace.columns.map((column, index) => {
                    if (index === currentColumnIndex) {
                        return {
                            ...column,
                            tasks: column.tasks.filter((task) => task.id !== taskId),
                        };
                    }

                    if (index === targetColumnIndex) {
                        return {
                            ...column,
                            tasks: [...column.tasks, taskToMove],
                        };
                    }

                    return column;
                });

                return {
                    ...workspace,
                    columns: updatedColumns,
                };
            })
        );
    }

    return (
        <WorkspacesContext.Provider
            value={{ workspaces, getWorkspaceById, addWorkspace, addColumn, addTask, moveTask }}
        >
            {children}
        </WorkspacesContext.Provider>
    )
}
