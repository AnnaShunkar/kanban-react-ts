import AddWorkspaceForm from "../components/workspaces/AddWorkspaceForm";
import WorkspaceList from "../components/workspaces/WorkspaceList";
import "../styles/main.css"
export default function WorkspacePage() {
    return (
        <section className="workspaces-page">
            <h1 className="workspaces-title">Workspaces</h1>
            <div className="workspaces-panel">
                <AddWorkspaceForm />
                <WorkspaceList/>
            </div>
        </section>
    )
}