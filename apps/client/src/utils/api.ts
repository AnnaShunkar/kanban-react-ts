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

export async function createColumn(payload: { title: string; workspaceId: string }) {
  const response = await fetch(`${API_URL}/columns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create column');
  }
  return response.json();
}

export async function updateColumn(columnId: string, title: string) {
  const response = await fetch(`${API_URL}/columns/${columnId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error('Failed to update column');
  }
  return response.json();
}

export async function deleteColumn(columnId: string) {
  const response = await fetch(`${API_URL}/columns/${columnId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete column');
  }
  return response.json();
}

export async function createTask(payload: { title: string; columnId: string }) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
}

export async function updateTask(taskId: string, title: string) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
}

export async function deleteTask(taskId: string) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return response.json();
}

export async function getUserByName(name: string) {
  const response = await fetch(`${API_URL}/users/name/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
}