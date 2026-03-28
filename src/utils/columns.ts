import type { Workspace } from "../types";

export function moveColumns(
  workspaces: Workspace[],
  workspaceId: string,
  columnId: string,
  direction: "left" | "right"
): Workspace[] {
    return workspaces.map((workspace) => {
        if (workspace.id !== workspaceId) return workspace;

        const currentIndex = workspace.columns.findIndex(
            (column) => column.id === columnId
        );
        if (currentIndex === -1) return workspace;

        const targetIndex =
            direction === "left" ? currentIndex - 1 : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= workspace.columns.length) {
            return workspace;
        }

        const updatedColumns = [...workspace.columns];
        const [removed] = updatedColumns.splice(currentIndex, 1);
        updatedColumns.splice(targetIndex, 0, removed);

        return {
            ...workspace,
            columns: updatedColumns,
        };
    });
}