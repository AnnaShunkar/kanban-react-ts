import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"
import { validTaskTitle } from "../../utils/validation";

interface AddTaskFormProps{
    workspaceId: string;
    columnId: string;
}
export function AddTaskForm({ workspaceId, columnId }: AddTaskFormProps) {
    const { addTask } = useWorkspaces();
    const [title, setTitle] = useState("");
    const[error, setError] = useState("");

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
        const validError = validTaskTitle(title);

        if (validError) {
            setError(validError);
            return;
        }
        addTask(workspaceId, columnId, title.trim());
        setTitle("");
    }
    function handleChange(event: { currentTarget: { value: string; }; }) {
        const newValue = event.currentTarget.value;
        setTitle(newValue);
        const validError = validTaskTitle(newValue);
        if (validError) {
            setError(validError);
        } else {
            setError("");
        }
    }

    return (
        <form  className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Task"
                value={title}
                onChange={handleChange} />
            {error && <p className="error-text">{error}</p>}
            <button type="submit">
                Add task
            </button>
        </form>
    );
};