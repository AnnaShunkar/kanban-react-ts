import { useWorkspaces } from "../../hooks/useWorkspaces";
import { useState } from "react";
import type { FC } from "react";
import "../../styles/board.css"

interface TaskCardProps {
    workspaceId: string;
    columnId: string;
    taskId: string;
    title: string;
    canMoveLeft: boolean;
    canMoveRight: boolean;
    onMoveLeft: () => void;
    onMoveRight: () => void;
}

export const TaskCard: FC<TaskCardProps> = ({
    workspaceId,
    columnId,
    taskId,
    title,
    canMoveLeft,
    canMoveRight,
    onMoveLeft,
    onMoveRight,
}) => {
    const { updateTask, deleteTask } = useWorkspaces();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);

    const leftMoveButton = canMoveLeft ? (
        <button className="move-button" type="button" onClick={onMoveLeft}>
            ←
        </button>
    ) : null;

    const taskTitle = isEditing ? (
        <input
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
        />
    ) : (
        <span>{title}</span>
    );

    const rightMoveButton = canMoveRight ? (
        <button className="move-button" type="button" onClick={onMoveRight}>
            →
        </button>
    ) : null;

    const handleSave = (): void => {
        const trimValue = value.trim();

        if (!trimValue) {
            return;
        }

        updateTask(workspaceId, columnId, taskId, trimValue);
        setIsEditing(false);
    };

    return (
        <div className="task-card">
            {leftMoveButton}
            {taskTitle}

            <div>
                <button  className="e-d-button"
                type="button"
                onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                }
            >
                {isEditing ? "Save" : "Edit"}
            </button>

            <button className="e-d-button"
                type="button"
                onClick={() => deleteTask(workspaceId, columnId, taskId)}
            >
                Delete
            </button>
            </div>

            {rightMoveButton}
        </div>
    );
}
