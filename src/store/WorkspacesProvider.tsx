import { useState, type FC, type ReactNode } from "react";
import { mockWorkspaces } from "../data/mockData";
import { WorkspacesContext } from "./WorkspacesContext";
import type { Workspace } from "../types/workspace";
import { moveTask } from "../utils/tasks";
import { moveColumns } from "../utils/columns";

interface WorkspacesProviderProps {
    children: ReactNode;
}

export const WorkspacesProvider: FC<WorkspacesProviderProps> = ({ children }) => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
//WORKSPACES
    const getWorkspaceById = (workspaceId: string): Workspace | undefined => {
        return workspaces.find((workspace) => workspace.id === workspaceId);
    };

    const addWorkspace = (title: string): void => {
        const newWorkspace: Workspace = {
            id: crypto.randomUUID(),
            title,
            columns: [],
        };
        setWorkspaces((prev) => [...prev, newWorkspace]);
    };

    const updateWorkspace = (workspaceId: string, newTitle: string): void => {
        setWorkspaces((prev) =>
            prev.map((workspace) => workspace.id === workspaceId
                ? { ...workspace, title: newTitle }
                : workspace));
    };

    const deleteWorkspace = (workspaceId: string): void => {
        setWorkspaces((prev) =>
            prev.filter((workspace) => workspace.id !== workspaceId));
    };
//COLUMNS
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
    };

    const updateColumn = (workspaceId: string, columnId: string, newTitle: string): void => {
        setWorkspaces((prev) =>
            prev.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                        ...workspace,
                        columns: workspace.columns.map((column) =>
                            column.id === columnId
                                ? { ...column, title: newTitle }
                                : column
                        ),
                    }
                    : workspace
            ));
    };

    const deleteColumn = (workspaceId: string, columnId: string): void => {
        setWorkspaces((prev) =>
            prev.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                        ...workspace,
                        columns: workspace.columns.filter(
                            (column) => column.id !== columnId
                        ),
                    }
                    : workspace
            )
        );
    };

//TASKS 
    const addTask = (workspaceId: string, columnId: string, title: string): void => {
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
    };

    const updateTask = (
        workspaceId: string,
        columnId: string,
        taskId: string,
        newTitle: string
    ): void => {
        setWorkspaces((prev) =>
            prev.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                        ...workspace,
                        columns: workspace.columns.map((column) =>
                            column.id === columnId
                                ? {
                                    ...column,
                                    tasks: column.tasks.map((task) =>
                                        task.id === taskId
                                            ? { ...task, title: newTitle }
                                            : task
                                    ),
                                }
                                : column
                        ),
                    }
                    : workspace
            )
        );
    };

    const deleteTask = (workspaceId: string, columnId: string, taskId: string): void => {
        setWorkspaces((prev) =>
            prev.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                        ...workspace,
                        columns: workspace.columns.map((column) =>
                            column.id === columnId
                                ? {
                                    ...column,
                                    tasks: column.tasks.filter((task) => task.id !== taskId),
                                }
                                : column
                        ),
                    }
                    : workspace
            )
        );
    };
//moving for tasks and columns
    const moveTaskHandler = (
        workspaceId: string,
        taskId: string,
        fromColumnId: string,
        direction: "left" | "right"
    ): void => {
        setWorkspaces((prev) =>
            moveTask(prev, workspaceId, taskId, fromColumnId, direction)
        );
    };

    const moveColumnsHandler = (
        workspaceId: string,
        columnId: string,
        direction: "left" | "right"
    ): void => {
        setWorkspaces((prev) =>
            moveColumns(prev, workspaceId, columnId, direction)
        );
    };

    return (
        <WorkspacesContext.Provider
            value={{ workspaces, getWorkspaceById, addWorkspace, updateWorkspace, deleteWorkspace, addColumn, updateColumn, deleteColumn, addTask, updateTask, deleteTask, moveTask: moveTaskHandler, moveColumns: moveColumnsHandler}}
        >
            {children}
        </WorkspacesContext.Provider>
    )
}
