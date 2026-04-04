export const API_URL = import.meta.env.VITE_API_URL;

export async function getWorkspaces() {
  const response = await fetch(`${API_URL}/workspaces`);

  if (!response.ok) {
    throw new Error('Failed to fetch workspaces');
  }

  return response.json();
}

interface CreateWorkspacePayload{
    title: string;
    userId: string;
}
export async function createWorkspace(payload: CreateWorkspacePayload) {
    const response = await fetch(`${API_URL}/workspaces`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error("Failed to create workspace");
    }

    return response.json();
}
export async function deleteWorkspace(workspaceId: string) {
        const response = await fetch(`${API_URL}/workspaces/${workspaceId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to create workspace');
        }

        return response.json();
}
export async function updateWorkspace(workspaceId: string,title: string) {
    const response = await fetch(`${API_URL}/workspaces/${workspaceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });
    if (!response.ok) {
        throw new Error('Failed to update workspace');
    }
    return response.json();
}