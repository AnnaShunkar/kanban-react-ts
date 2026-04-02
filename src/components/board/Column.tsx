import { useState } from "react";
import type { TaskColumn } from "../../types/taskcolumn";
import {TaskCard} from "./TaskCard";
import {AddTaskForm} from "./AddTaskForm";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/board.css"

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
    const { moveTask, moveColumns, updateColumn, deleteColumn } = useWorkspaces();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(column.title);
    
    function handleSave() {
    const trimTitle = title.trim();

    if (!trimTitle) {
      return;
    }

    updateColumn(workspaceId, column.id, trimTitle);
    setIsEditing(false);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.currentTarget.value);
    }
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

                {isEditing ? (
                    <input
                        value={title}
                        onChange={handleChange}
                    />
                ) : (
                    <h2>{column.title}</h2>
                )}

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
            <div className="edit-buttons">
                {isEditing ? (
                    <button className="e-d-button" type="button" onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button className="e-d-button" type="button" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}

                <button className="e-d-button"
                    type="button"
                    onClick={() => deleteColumn(workspaceId, column.id)}
                >
                    Delete
                </button>
            </div>

            <div className="tasks">
                {column.tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        workspaceId={workspaceId}
                        columnId={column.id}
                        taskId={task.id}
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
