import { create } from "zustand";
import type { AuthState } from "../types/auth";
import { getCurrentUser, loginUser, registerUser, logoutUser } from "../utils/storage";
import { useWorkspacesStore } from "./workspacesStore";
export const useAuthStore = create<AuthState>((set) => ({
    user: getCurrentUser(),

    login: async (name: string, password: string): Promise<boolean> => {
        const successLogin = await loginUser(name, password);

        if (successLogin) {
            useWorkspacesStore.getState().resetWorkspaces();
            set({user: name});
        }
        return successLogin;
    },

    register: async (name: string, email: string, password: string): Promise<boolean> => {
        const successRegistration = await registerUser({ name, email, password });
        if (successRegistration) {
            useWorkspacesStore.getState().resetWorkspaces();
            set({user: name});
        }
        return successRegistration;
    },

    logout: (): void => {
        logoutUser();
        useWorkspacesStore.getState().resetWorkspaces();
        set({user: null});
    },
}));
