import type { FC } from "react";
import {AddWorkspaceForm} from "../components/workspaces/AddWorkspaceForm";
import {WorkspaceList} from "../components/workspaces/WorkspaceList";
import "../styles/main.css"

export const WorkspacesPage: FC = () => {
    return (
        <section className="workspaces-page">
            <h1 className="workspaces-title">Workspaces</h1>
            <div className="workspaces-panel">
                <AddWorkspaceForm />
                <WorkspaceList />
            </div>
        </section>
    )
}
