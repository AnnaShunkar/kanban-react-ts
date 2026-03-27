import type { TaskColumn } from "../../types";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import "../../styles/main.css"

interface ColumnProps{
    workspaceId: string;
    column: TaskColumn;
}

export default function Column({ workspaceId, column }: ColumnProps) {
    return (
        <div className="board-column">
            <h2>{column.title}</h2>
            <div className="tasks">
                {column.tasks.map((task) => <TaskCard key={task.id} title={task.title} />)}
            </div>
            <AddTaskForm workspaceId={workspaceId} columnId={column.id} />
        </div>
    );
}