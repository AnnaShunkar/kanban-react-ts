import { create } from "zustand";
import type { AuthState } from "../types/auth";
import { hashPassword } from "../utils/crypto";
import { createUser, getUserByName } from "../utils/api";
import { useWorkspacesStore } from "./workspacesStore";
export const useAuthStore = create<AuthState>((set) => ({
    user: localStorage.getItem("user"),

    login: async (name: string, password: string): Promise<boolean> => {
        try {
            const savedUser = await getUserByName(name);
            if (!savedUser) {
                return false;
            }
            const hashedInput = await hashPassword(password);
            const successLogin = savedUser.password === hashedInput;
            if (successLogin) {
                localStorage.setItem("user", name);
                useWorkspacesStore.getState().resetWorkspaces();
                set({user: name});
            }
            return successLogin;
        } catch {
            return false;
        }
    },

    register: async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            const existingUser = await getUserByName(name);
            if (existingUser) {
                return false;
            }
        } catch {
            // If user is not found or API temporarily errors, continue and try create.
        }

        try {
            const hashedPassword = await hashPassword(password);
            await createUser({ name, email, password: hashedPassword });
            localStorage.setItem("user", name);
            useWorkspacesStore.getState().resetWorkspaces();
            set({user: name});
            return true;
        } catch {
            return false;
        }
    },

    logout: (): void => {
        localStorage.removeItem("user");
        useWorkspacesStore.getState().resetWorkspaces();
        set({user: null});
    },
}));
