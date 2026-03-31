import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/workspaces.css"
import "../../styles/modal.css"
import { validWorkspaceTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";
import { ConfirmModal } from "../modals/ConfirmModal";

export function AddWorkspaceForm() {
    const { addWorkspace } = useWorkspaces();
    const [showTextModal, setShowTextModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    return (
        <>
            <button className="add-button" type="button" onClick={() => setShowTextModal(true)}>
                Add workspace
            </button>
            {showTextModal && (
                <TextModal
                    title="Add Workspace"
                    submitLabel="Add"
                    placeholder="Workspace title"
                    onClose={() => setShowConfirmModal(true)}
                    onSubmit={(workspaceTitle) => {
                        addWorkspace(workspaceTitle);
                        setShowTextModal(false);
                    }}
                    validate={validWorkspaceTitle}
                />
            )}
            {showConfirmModal && (
                <ConfirmModal title="Leave?"
                    message="Close this modal?"
                    onConfirm={() => { setShowConfirmModal(false); setShowTextModal(false); }}
                    onCancel={() => { setShowConfirmModal(false) }}
                    onClose={() => { setShowConfirmModal(false) }}
                />
            )}
        </>
    );
}
