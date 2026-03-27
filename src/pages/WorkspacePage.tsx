import { useParams } from "react-router";
import { useWorkspaces } from "../hooks/useWorkspaces";
import Column from "../components/board/Column";
import AddColumnForm from "../components/board/AddColumnForm";
import "../styles/main.css"

export default function WorkspacePage() {
    const { workspaceId } = useParams();
    const { getWorkspaceById } = useWorkspaces();

    if (!workspaceId) {
        return <p>Workspace id is missing.</p>
    }
    const workspace = getWorkspaceById(workspaceId);

    if (!workspace) {
        return <p>Workspace not found.</p>;
    }
    return (
        <section className="workspace-page">
            <h1 className="workspace-title">{workspace.title}</h1>
            <AddColumnForm workspaceId={workspace.id} />
            <div className="board">
                {workspace.columns.map((column) => (
                    <Column
                        key={column.id}
                        workspaceId={workspace.id}
                        column={column}
                    />
                ))}
            </div>
        </section>
    )
}