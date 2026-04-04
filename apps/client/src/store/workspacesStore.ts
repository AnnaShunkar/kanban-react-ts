import { create } from 'zustand';
import { mockWorkspaces } from '../data/mockData';
import type { Workspace, WorkspacesState } from '../types/workspace';
import { moveTask } from '../utils/tasks';
import { moveColumns } from '../utils/columns';
import {
  createWorkspace,
  getWorkspaces,
  deleteWorkspace as deleteWorkspaceRequest,
  updateWorkspace as updateWorkspaceRequest,
} from '../utils/api';

const getInitialWorkspaces = (): Workspace[] => structuredClone(mockWorkspaces);

export const useWorkspacesStore = create<WorkspacesState>((set, get) => ({
  //WORKSPACES
  workspaces: [],
  isLoading: false,
  error: null,

  fetchWorkspaces: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const fetchedWorkspaces = await getWorkspaces();
      set({ workspaces: fetchedWorkspaces, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  getWorkspaceById: (workspaceId: string): Workspace | undefined => {
    return get().workspaces.find((workspace) => workspace.id === workspaceId);
  },

  resetWorkspaces: (): void => {
    set({ workspaces: getInitialWorkspaces() });
  },

  addWorkspace: async (title: string): Promise<void> => {
    const createdWorkspace = await createWorkspace({
      title,
      userId: '11111111-1111-1111-1111-111111111111',
    });
    set((state) => ({
      workspaces: [...state.workspaces, createdWorkspace],
    }));
  },

  updateWorkspace: async (
    workspaceId: string,
    newTitle: string,
  ): Promise<void> => {
      const updatedWorkspace = await updateWorkspaceRequest(
        workspaceId,
        newTitle,
      );
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId ? updatedWorkspace : workspace,
      ),
    }));
  },

  deleteWorkspace: async (workspaceId: string): Promise<void> => {
    await deleteWorkspaceRequest(workspaceId);

    set((state) => ({
      workspaces: state.workspaces.filter(
        (workspace) => workspace.id !== workspaceId,
      ),
    }));
  },
  //COLUMNS
  addColumn: (workspaceId: string, title: string): void => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              columns: [
                ...workspace.columns,
                {
                  id: crypto.randomUUID(),
                  title,
                  tasks: [],
                },
              ],
            }
          : workspace,
      ),
    }));
  },

  updateColumn: (
    workspaceId: string,
    columnId: string,
    newTitle: string,
  ): void => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              columns: workspace.columns.map((column) =>
                column.id === columnId
                  ? { ...column, title: newTitle }
                  : column,
              ),
            }
          : workspace,
      ),
    }));
  },

  deleteColumn: (workspaceId: string, columnId: string): void => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              columns: workspace.columns.filter(
                (column) => column.id !== columnId,
              ),
            }
          : workspace,
      ),
    }));
  },

  //TASKS
  addTask: (workspaceId: string, columnId: string, title: string): void => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              columns: workspace.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: [
                        ...column.tasks,
                        {
                          id: crypto.randomUUID(),
                          title,
                        },
                      ],
                    }
                  : column,
              ),
            }
          : workspace,
      ),
    }));
  },

  updateTask: (
    workspaceId: string,
    columnId: string,
    taskId: string,
    newTitle: string,
  ): void => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
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
                          : task,
                      ),
                    }
                  : column,
              ),
            }
          : workspace,
      ),
    }));
  },

  deleteTask: (workspaceId: string, columnId: string, taskId: string): void => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              columns: workspace.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column,
              ),
            }
          : workspace,
      ),
    }));
  },

  moveTask: (
    workspaceId: string,
    taskId: string,
    fromColumnId: string,
    direction: 'left' | 'right',
  ): void => {
    set((state) => ({
      workspaces: moveTask(
        state.workspaces,
        workspaceId,
        taskId,
        fromColumnId,
        direction,
      ),
    }));
  },

  moveColumns: (
    workspaceId: string,
    columnId: string,
    direction: 'left' | 'right',
  ): void => {
    set((state) => ({
      workspaces: moveColumns(
        state.workspaces,
        workspaceId,
        columnId,
        direction,
      ),
    }));
  },
}));
