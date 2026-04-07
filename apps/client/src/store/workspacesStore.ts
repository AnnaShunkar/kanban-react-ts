import { create } from 'zustand';
import { mockWorkspaces } from '../data/mockData';
import type { Workspace, WorkspacesState } from '../types/workspace';
import { moveTask } from '../utils/tasks';
import { moveColumns } from '../utils/columns';
import {
  createColumn as createColumnRequest,
  createTask as createTaskRequest,
  createWorkspace,
  deleteColumn as deleteColumnRequest,
  deleteTask as deleteTaskRequest,
  getWorkspaces,
  getUserByName,
  deleteWorkspace as deleteWorkspaceRequest,
  updateColumn as updateColumnRequest,
  updateTask as updateTaskRequest,
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
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
      throw new Error('User is not logged in');
    }
    const user = await getUserByName(currentUser);
    if (!user?.id) {
      throw new Error('User does not exist in database');
    }
    const createdWorkspace = await createWorkspace({
      title,
      userId: user.id,
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
  addColumn: async (workspaceId: string, title: string): Promise<void> => {
    const createdColumn = await createColumnRequest({ title, workspaceId });
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              columns: [
                ...workspace.columns,
                { ...createdColumn, tasks: [] },
              ],
            }
          : workspace,
      ),
    }));
  },

  updateColumn: async (
    workspaceId: string,
    columnId: string,
    newTitle: string,
  ): Promise<void> => {
    await updateColumnRequest(columnId, newTitle);
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

  deleteColumn: async (workspaceId: string, columnId: string): Promise<void> => {
    await deleteColumnRequest(columnId);
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
  addTask: async (
    workspaceId: string,
    columnId: string,
    title: string,
  ): Promise<void> => {
    const createdTask = await createTaskRequest({ title, columnId });
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
                        createdTask,
                      ],
                    }
                  : column,
              ),
            }
          : workspace,
      ),
    }));
  },

  updateTask: async (
    workspaceId: string,
    columnId: string,
    taskId: string,
    newTitle: string,
  ): Promise<void> => {
    await updateTaskRequest(taskId, newTitle);
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

  deleteTask: async (
    workspaceId: string,
    columnId: string,
    taskId: string,
  ): Promise<void> => {
    await deleteTaskRequest(taskId);
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
