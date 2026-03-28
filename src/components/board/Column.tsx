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
    const { moveTask } = useWorkspaces();

    return (
        <div className="board-column">
            <h2>{column.title}</h2>
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
