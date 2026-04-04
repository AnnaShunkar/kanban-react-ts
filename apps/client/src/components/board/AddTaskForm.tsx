import { useState, type FC } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/modal.css"
import "../../styles/board.css"
import { taskFormSchema } from "../../schemas/entitySchema";
import { TextModal } from "../modals/TextModal";
import { ConfirmModal } from "../modals/ConfirmModal";
import { ModalKeys } from "../../utils/modalKeys";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddTaskFormProps{
    workspaceId: string;
    columnId: string;
}
export const AddTaskForm: FC<AddTaskFormProps> = ({ workspaceId, columnId }) => {
    const { addTask } = useWorkspaces();
    const [activeModal, setActiveModal] = useState<ModalKeys | null>(null);
    const [activeConfirmModal, setActiveConfirmModal] = useState<ModalKeys | null>(null);

    const textModal = activeModal === ModalKeys.AddTask ? (
        <TextModal
            title="Add Task"
            submitLabel="Add"
            placeholder="Task text"
            onClose={() => setActiveConfirmModal(ModalKeys.AddTaskConfirm)}
            onSubmit={(taskTitle) => {
                addTask(workspaceId, columnId, taskTitle);
                setActiveModal(null);
            }}
            resolver={zodResolver(taskFormSchema)}
        />
    ) : null;

    const confirmModal = activeConfirmModal === ModalKeys.AddTaskConfirm ? (
        <ConfirmModal title="Leave?"
            message="Close task modal?"
            onConfirm={() => {
                setActiveConfirmModal(null);
                setActiveModal(null);
            }}
            onCancel={() => { setActiveConfirmModal(null) }}
        />
    ) : null;

    return (
        <>
            <button className="add-button" type="button" onClick={() => setActiveModal(ModalKeys.AddTask)}>
                Add task
            </button>
            {textModal}
            {confirmModal}
        </>
    );
};
