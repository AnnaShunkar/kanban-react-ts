import { z } from "zod";

export const workspaceFormSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "Workspace name cannot be empty")
    .min(5, "Workspace name must be between 5 and 30 characters")
    .max(30, "Workspace name must be between 5 and 30 characters"),
});

export const columnFormSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "Column name cannot be empty")
    .min(5, "Column name must be between 5 and 20 characters")
    .max(20, "Column name must be between 5 and 20 characters"),
});

export const taskFormSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, "Task name cannot be empty"),
});
