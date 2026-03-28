import type { TaskColumn } from "../../types";
import {TaskCard} from "./TaskCard";
import {AddTaskForm} from "./AddTaskForm";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"

interface ColumnProps {
    workspaceId: string;
    column: TaskColumn;
    columnIndex: number;
    totalColumns: number;
}

export function Column({
    workspaceId,
    column,
    columnIndex,
    totalColumns,
}: ColumnProps) {
    const { moveTask, moveColumns } = useWorkspaces();

    return (
        <div className="board-column">
            <div className="column-header">
                {columnIndex > 0 ? (
                    <button
                        type="button"
                        className="column-move-button"
                        onClick={() => moveColumns(workspaceId, column.id, "left")}
                    >
                        ←
                    </button>
                ) : (
                    <span className="column-move-placeholder" />
                )}

                <h2>{column.title}</h2>

                {columnIndex < totalColumns - 1 ? (
                    <button
                        type="button"
                        className="column-move-button"
                        onClick={() => moveColumns(workspaceId, column.id, "right")}
                    >
                        →
                    </button>
                ) : (
                    <span className="column-move-placeholder" />
                )}
            </div>

            <div className="tasks">
                {column.tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        canMoveLeft={columnIndex > 0}
                        canMoveRight={columnIndex < totalColumns - 1}
                        onMoveLeft={() => moveTask(workspaceId, task.id, column.id, "left")}
                        onMoveRight={() => moveTask(workspaceId, task.id, column.id, "right")}
                    />
                ))}
            </div>
            <AddTaskForm workspaceId={workspaceId} columnId={column.id} />
        </div>
    );
}
