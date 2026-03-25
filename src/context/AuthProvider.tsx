import { useState } from 'react';
import { AuthContext } from './AuthContext';
import type { ReactNode } from 'react';
import { getCurrentUser, logoutUser, registerUser, loginUser } from '../utils/storage';

interface AuthProviderProps {
    children: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<string | null>(() => getCurrentUser());

    async function login(name: string, password: string): Promise<boolean> {
        const successLogin = await loginUser(name, password);

        if (successLogin) {
            setUser(name);
        }
        return successLogin;
    }

    async function register(name: string, email: string, password: string): Promise<boolean> {
        const successRegistration = await registerUser({ name, email, password });
        if (successRegistration) {
            setUser(name);
        }
        return successRegistration;
    }

    function logout(): void {
        logoutUser();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
    };

