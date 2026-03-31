import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/workspaces.css"
import "../../styles/modal.css"
import { validWorkspaceTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";

export function AddWorkspaceForm() {
    const { addWorkspace } = useWorkspaces();
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button className="add-button" type="button" onClick={() => setShowModal(true)}> 
                Add workspace
            </button>
            {showModal && (
                <TextModal
                    title="Add Workspace"
                    submitLabel="Add"
                    placeholder="Workspace title"
                    onClose={() => setShowModal(false)}
                    onSubmit={(workspaceTitle) => {
                        addWorkspace(workspaceTitle);
                        setShowModal(false);
                    }}
                    validate={validWorkspaceTitle}
                />
            )}
        </>
    );
}
