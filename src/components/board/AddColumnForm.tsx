import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"

interface AddColumnFormProps{
    workspaceId: string;
}

export default function AddColumnForm({ workspaceId }: AddColumnFormProps){
    const { addColumn } = useWorkspaces();
    const [title, setTitle] = useState("");

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimTitle = title.trim();
        if (!trimTitle) {
            return;
        };
        addColumn(workspaceId, trimTitle);
        setTitle("");
    }

    return (
        <form className="column-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Column"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
            />
            <button type="submit">Add Column</button>
        </form>
    );
}