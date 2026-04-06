import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from './authSchema';
import {
  columnFormSchema,
  taskFormSchema,
  workspaceFormSchema,
} from './entitySchema';

export const loginResolver = zodResolver(loginSchema);
export const registerResolver = zodResolver(registerSchema);

export const workspaceResolver = zodResolver(workspaceFormSchema);
export const columnResolver = zodResolver(columnFormSchema);
export const taskResolver = zodResolver(taskFormSchema);
