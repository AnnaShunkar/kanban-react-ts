import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"
import { validColumnTitle } from "../../utils/validation";

interface AddColumnFormProps{
    workspaceId: string;
}

export function AddColumnForm({ workspaceId }: AddColumnFormProps){
    const { addColumn } = useWorkspaces();
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const validError = validColumnTitle(title);

        if (validError) {
            setError(validError);
            return;
        }
        
        addColumn(workspaceId, title.trim());
        setTitle("");
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        setTitle(newValue);
        const validError = validColumnTitle(newValue);
        if (validError) {
            setError(validError);
        } else {
            setError("");
        }
    }

    return (
        <form className="column-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Column"
                value={title}
                onChange={handleChange}
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit">Add Column</button>
        </form>
    );
}
