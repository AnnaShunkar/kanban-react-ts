export type AuthState = {
    user: string | null;
    login: (name: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}
