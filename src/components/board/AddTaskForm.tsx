import { useState, type FC } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/modal.css"
import "../../styles/board.css"
import { validTaskTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";
import { ConfirmModal } from "../modals/ConfirmModal";

interface AddTaskFormProps{
    workspaceId: string;
    columnId: string;
}
export const AddTaskForm: FC<AddTaskFormProps> = ({ workspaceId, columnId }) => {
    const { addTask } = useWorkspaces();
    const [showTextModal, setShowTextModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const textModal = showTextModal ? (
        <TextModal
            title="Add Task"
            submitLabel="Add"
            placeholder="Task text"
            onClose={() => setShowConfirmModal(true)}
            onSubmit={(taskTitle) => {
                addTask(workspaceId, columnId, taskTitle);
                setShowTextModal(false);
            }}
            validate={validTaskTitle}
        />
    ) : null;
    const confirmModal = showConfirmModal ? (
        <ConfirmModal title="Leave?"
            message="Close task modal?"
            onConfirm={() => { setShowConfirmModal(false); setShowTextModal(false); }}
            onCancel={() => { setShowConfirmModal(false) }}
        />
    ) : null;

    return (
        <>
            <button className="add-button" type="button" onClick={() => setShowTextModal(true)}>
                Add task
            </button>
            {textModal}
            {confirmModal}
        </>
    );
};
