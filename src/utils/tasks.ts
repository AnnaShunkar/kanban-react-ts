import type { Workspace } from "../types";

export function moveTask(
  workspaces: Workspace[],
  workspaceId: string,
  taskId: string,
  fromColumnId: string,
  direction: "left" | "right"
): Workspace[] {
  return workspaces.map((workspace) => {
    if (workspace.id !== workspaceId) return workspace;

    const currentColumnIndex = workspace.columns.findIndex(
      (column) => column.id === fromColumnId
    );
    if (currentColumnIndex === -1) return workspace;

    const targetColumnIndex =
      direction === "left" ? currentColumnIndex - 1 : currentColumnIndex + 1;

    if (targetColumnIndex < 0 || targetColumnIndex >= workspace.columns.length) {
      return workspace;
    }

    const currentColumn = workspace.columns[currentColumnIndex];
    const taskToMove = currentColumn.tasks.find((task) => task.id === taskId);
    if (!taskToMove) return workspace;

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
  });
}