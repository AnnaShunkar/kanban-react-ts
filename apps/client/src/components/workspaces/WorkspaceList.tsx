import { useState, type FC } from "react";
import { Link } from "react-router";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"
import { getWorkspaceRoute } from "../../utils/routes";

export const WorkspaceList: FC = () => {
    const { workspaces, updateWorkspace, deleteWorkspace } = useWorkspaces();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");

    if (workspaces.length === 0) {
        return <p>No workspaces yet.</p>
    }

    const startEdit = (id: string, currentTitle: string): void => {
        setEditingId(id);
        setTitle(currentTitle);
    };

    const saveEdit = (workspaceId: string): void => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        updateWorkspace(workspaceId, trimmedTitle);
        setEditingId(null);
        setTitle("");
    };

    return (
    <ul className="workspace-list">
      {workspaces.map((workspace) => (
        <li className="workspace-card" key={workspace.id}>
          {editingId === workspace.id ? (
                <div className="workspace-edit">
                  <input
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              <button className="e-d-button" type="button" onClick={() => saveEdit(workspace.id)}>
                Save
              </button>
          </div>
            
          ) : (
            <>
              <Link
                className="workspace-link"
                to={getWorkspaceRoute(workspace.id)}
              >
                {workspace.title}
              </Link>

              <button className="e-d-button"
                type="button"
                onClick={() => startEdit(workspace.id, workspace.title)}
              >
                Edit
              </button>

              <button className="e-d-button"
                type="button"
                onClick={() => deleteWorkspace(workspace.id)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
    )
}
