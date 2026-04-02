import { useState, type FC } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/workspaces.css"
import "../../styles/modal.css"
import { validWorkspaceTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";
import { ConfirmModal } from "../modals/ConfirmModal";
import { ModalKeys } from "../../utils/modalKeys";

export const AddWorkspaceForm: FC = () => {
    const { addWorkspace } = useWorkspaces();
    const [activeModal, setActiveModal] = useState<ModalKeys | null>(null);
    const [activeConfirmModal, setActiveConfirmModal] = useState<ModalKeys | null>(null);
    
    const textModal = activeModal === ModalKeys.AddWorkspace ? (
        <TextModal
            title="Add Workspace"
            submitLabel="Add"
            placeholder="Workspace title"
            onClose={() => setActiveConfirmModal(ModalKeys.AddWorkspaceConfirm)}
            onSubmit={(workspaceTitle) => {
                addWorkspace(workspaceTitle);
                setActiveModal(null);
            }}
            validate={validWorkspaceTitle}
        />
    ) : null;

    const confirmModal = activeConfirmModal === ModalKeys.AddWorkspaceConfirm ? (
        <ConfirmModal title="Leave?"
            message="Close this modal?"
            onConfirm={() => {
                setActiveConfirmModal(null);
                setActiveModal(null);
            }}
            onCancel={() => { setActiveConfirmModal(null) }}
        />
    ) : null;

    return (
        <>
            <button className="add-button" type="button" onClick={() => setActiveModal(ModalKeys.AddWorkspace)}>
                Add workspace
            </button>
            {textModal}
            {confirmModal}
        </>
    );
}
