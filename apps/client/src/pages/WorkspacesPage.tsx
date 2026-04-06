import {type FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useWorkspaces } from "../hooks/useWorkspaces";
import {AddWorkspaceForm} from "../components/workspaces/AddWorkspaceForm";
import {WorkspaceList} from "../components/workspaces/WorkspaceList";
import "../styles/main.css"
import { AppRoute } from "../utils/routes";

export const WorkspacesPage: FC = () => {
    const { logout } = useAuth();
    const { fetchWorkspaces, isLoading, error } = useWorkspaces();
    const navigate = useNavigate();

    useEffect(() => {
        void fetchWorkspaces();
    }, [fetchWorkspaces]);

    const handleLogout = (): void => {
        logout();
        navigate(AppRoute.HOME);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="workspaces-page">
            <h1 className="workspaces-title">Workspaces</h1>
            <button type="button" onClick={handleLogout} className="logout-button">
                Log out
            </button>
            <div className="workspaces-panel">
                <AddWorkspaceForm />
                <WorkspaceList />
            </div>
        </section>
    )
}
