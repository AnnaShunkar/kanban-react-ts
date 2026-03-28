import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"

interface AddTaskFormProps{
    workspaceId: string;
    columnId: string;
}
export function AddTaskForm({ workspaceId, columnId }: AddTaskFormProps) {
    const { addTask } = useWorkspaces();
    const [title, setTitle] = useState("");

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimTitle = title.trim();

    if (!trimTitle) {
      return;
        }
        addTask(workspaceId, columnId, trimTitle);
        setTitle("");
    }

    return (
        <form  className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Task"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)} />
            <button type="submit">
                Add task
            </button>
        </form>
    );
};