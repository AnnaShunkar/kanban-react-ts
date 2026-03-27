import { Link } from "react-router";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"

export default function WorkspaceList() {
    const { workspaces } = useWorkspaces();
    if (workspaces.length === 0) {
        return <p>No workspaces yet.</p>
    }
    return (
        <ul className="workspace-list">
            {workspaces.map((workspace) => (
                <li className="workspace-card" key={workspace.id}>
                    <Link className="workspace-link" to={`/workspaces/${workspace.id}`}>{workspace.title}</Link>
                </li>
            ))}
        </ul>
    )
}