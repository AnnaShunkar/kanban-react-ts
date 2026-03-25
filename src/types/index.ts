export type TaskStatus = 'todo' | 'progress' | 'done';

export type Task = {
    id: string;
    text: string;
    status: string;
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