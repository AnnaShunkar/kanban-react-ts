import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth uses only inside AuthProvider");
    }
    return context;
}