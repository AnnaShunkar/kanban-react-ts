import { z } from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .trim()
        .min(1, "Workspace name cannot be empty"),
    
    password: z
    .string()
    .trim()
    .min(1, "Password cannot be empty")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty"),

  email: z
    .string()
    .trim()
    .min(1, "Email cannot be empty")
    .email("Email format is invalid"),

  password: z
    .string()
    .trim()
    .min(1, "Password cannot be empty")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

