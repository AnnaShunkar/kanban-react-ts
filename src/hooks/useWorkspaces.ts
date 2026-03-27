import { useContext } from "react";
import { WorkspacesContext } from "../store/WorkspacesContext";

export function useWorkspaces() {
    const context = useContext(WorkspacesContext);
    if (!context) {
        throw new Error("useWorkspace uses only inside WorkspaceProvider");
    }
    return context;
}