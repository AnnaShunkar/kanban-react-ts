import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"
import { validWorkspaceTitle } from "../../utils/validation";

export function AddWorkspaceForm() {
    const { addWorkspace } = useWorkspaces();
    const [title, setTitle] = useState("");
    const [error, setError] = useState('');
    
    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const validError = validWorkspaceTitle(title);

        if (validError) {
            setError(validError);
            return;
        }

        setError('');
        addWorkspace(title.trim());
        setTitle("");
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        setTitle(newValue);

        const validError = validWorkspaceTitle(newValue);
        if (validError) {
        setError(validError);
        } else {
        setError("");
        }
    }
    return (
        <form className="workspace-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Workspace"
                value={title}
                onChange={handleChange}
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit"> 
                Add workspace
            </button>
        </form>
    )
}
