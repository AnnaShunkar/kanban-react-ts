import { z } from "zod";

export const workspaceSchema = z
    .string()
    .trim()
    .min(1, "Workspace name cannot be empty.")
    .min(5, "Workspace name must be at least 5 characters.")
    .max(30, "Workspace name must be at most 30 characters.")
    .regex(/^[a-z]+$/, "Workspace name can't contains uppercase letters.")
    .refine((value) => !/\d/.test(value), {
        message: "Workspace name cannot contain numbers",
        
    });

export const columnSchema = z
    .string()
    .trim()
    .min(1, "Column name cannot be empty.")
    .min(5, "Column name must be at least 5 characters.")
    .max(30, "Column name must be at most 30 characters.");

export const taskSchema = z
    .string()
    .trim()
    .min(1, "Task name cannot be empty.");

export const passwordSchema = z
    .string()
    .trim()
    .min(1, "Password cannot be empty.")
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Za-z]/, "Password must contain at least one letter.")
    .regex(/\d/, "Password must contain at least one number.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email cannot be empty.")
  .email("Email format is invalid.");

export const validWorkspaceTitle = (title: string): string | null => {
  const result = workspaceSchema.safeParse(title);
  return result.success ? null : result.error.issues[0].message;
};

export const validColumnTitle = (title: string): string | null => {
  const result = columnSchema.safeParse(title);
  return result.success ? null : result.error.issues[0].message;
};

export const validTaskTitle = (title: string): string | null => {
  const result = taskSchema.safeParse(title);
  return result.success ? null : result.error.issues[0].message;
};

export const validPassword = (password: string): string | null => {
  const result = passwordSchema.safeParse(password);
  return result.success ? null : result.error.issues[0].message;
};
export const validEmail = (email: string): string | null => {
  const result = emailSchema.safeParse(email);
  return result.success ? null : result.error.issues[0].message;
};
