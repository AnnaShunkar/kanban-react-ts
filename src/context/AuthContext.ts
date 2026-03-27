import { createContext } from "react";

export interface AuthContextValue {
    user: string | null;
    login: (name: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextValue | null>(null);
