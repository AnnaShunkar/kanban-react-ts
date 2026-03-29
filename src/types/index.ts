export type Task = {
  id: string;
  title: string;
}

export type User = {
    name: string;
    email: string;
    password: string;
}

export type EncryptedPayload = {
    iv: number[];
    data: number[];
}

export type TaskColumn = {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Workspace {
  id: string;
  title: string;
  columns: TaskColumn[];
}
