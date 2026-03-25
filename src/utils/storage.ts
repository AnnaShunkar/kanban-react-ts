import type { Task, User, EncryptedPayload } from '../types';
import { getStoredKey, encryptData, decryptData, hashPassword } from './crypto';

//tasks//
export async function saveTasks(userName: string, tasks: Task[]): Promise<void> {
  const key = await getStoredKey();
    const encrypted = await encryptData<Task[]>(tasks, key);
    
  localStorage.setItem(`kanbanTasks_${userName}`, JSON.stringify(encrypted));
}

export async function loadTasks(userName: string): Promise<Task[]> {
    const raw = localStorage.getItem(`kanbanTasks_${userName}`);
    if (!raw) {
        return [];
    }
    const encrypted = JSON.parse(raw) as EncryptedPayload;
    const key = await getStoredKey();
    
    return decryptData<Task[]>(encrypted, key);
}
//users//
export async function saveUser(user: User): Promise<void>{
  const hashedPassword = await hashPassword(user.password);
    const safeUser: User = { 
        ...user,
        password: hashedPassword,
   };

  const key = await getStoredKey();
  const encrypted = await encryptData<User>(safeUser, key);

  localStorage.setItem(`user_${user.name}`, JSON.stringify(encrypted));
}

export async function getUser(name: string): Promise<User | null> {
    const raw = localStorage.getItem(`user_${name}`);
    if (!raw) {
        return null;
    }

  const encrypted = JSON.parse(raw) as EncryptedPayload;
    const key = await getStoredKey();
    
  return await decryptData<User>(encrypted, key);
}

export function getCurrenrUser(): string | null {
    return localStorage.getItem('user');
}

export async function loginUser(name: string, password: string): Promise<boolean> {
    const savedUser = await getUser(name);
    if (!savedUser) {
        return false;
    }

    const hashedInput = await hashPassword(password);
    if (savedUser.password !== hashedInput) {
        return false;
    }

    localStorage.setItem("user", name);
    return true;
}

export function logoutUser(): void{
    localStorage.removeItem("user");
}

export async function registerUser(user: User): Promise<boolean> {
    const existingUser = await getUser(user.name);
    if (existingUser) {
        return false;
    }

    await saveUser(user);
    localStorage.setItem("user", user.name);
    return true;
}