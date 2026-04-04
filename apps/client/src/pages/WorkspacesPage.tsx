import type { FC } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import {AddWorkspaceForm} from "../components/workspaces/AddWorkspaceForm";
import {WorkspaceList} from "../components/workspaces/WorkspaceList";
import "../styles/main.css"
import { AppRoutes } from "../utils/routes";

export const WorkspacesPage: FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = (): void => {
        logout();
        navigate(AppRoutes.Home);
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
