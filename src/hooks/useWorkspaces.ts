import { useWorkspacesStore } from "../store/workspacesStore";

export const useWorkspaces = () => {
    return useWorkspacesStore();
};
