import { useState, type SetStateAction } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"

export default function AddWorkspaceForm() {
    const { addWorkspace } = useWorkspaces();
    const [title, setTitle] = useState("");
    
    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimTitle = title.trim();
        if (!trimTitle) {
            return;
        };
        addWorkspace(trimTitle);
        setTitle("");
    }
    function handleChange(event: { currentTarget: { value: SetStateAction<string>; }; }) {
        setTitle(event.currentTarget.value);
    }
    return (
        <form className="workspace-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Workspace"
                value={title}
                onChange={handleChange} />
            <button type="submit"> 
                Add workspace
            </button>
        </form>
    )
}