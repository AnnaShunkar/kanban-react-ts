import { useState, type FC } from 'react';
import { Link } from 'react-router';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import '../../styles/main.css';
import { getWorkspaceRoute } from '../../utils/routes';

export const WorkspaceList: FC = () => {
  const { workspaces, updateWorkspace, deleteWorkspace } = useWorkspaces();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  if (workspaces.length === 0) {
    return <p>No workspaces yet.</p>;
  }

  const startEdit = (id: string, currentTitle: string): void => {
    setEditingId(id);
    setTitle(currentTitle);
  };

  const handleSaveEdit = async (workspaceId: string): Promise<void> => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    await updateWorkspace(workspaceId, trimmedTitle);
    setEditingId(null);
    setTitle('');
  };
  const handleDelete = async (workspaceId: string): Promise<void> => {
    await deleteWorkspace(workspaceId);
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
              <button
                className="e-d-button"
                type="button"
                onClick={() => void handleSaveEdit(workspace.id)}
              >
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

              <button
                className="e-d-button"
                type="button"
                onClick={() => startEdit(workspace.id, workspace.title)}
              >
                Edit
              </button>

              <button
                className="e-d-button"
                type="button"
                onClick={() => void handleDelete(workspace.id)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
