import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/main.css"
import "../../styles/modal.css"
import { validTaskTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";

interface AddTaskFormProps{
    workspaceId: string;
    columnId: string;
}
export function AddTaskForm({ workspaceId, columnId }: AddTaskFormProps) {
    const { addTask } = useWorkspaces();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="add-button" type="button" onClick={() => setShowModal(true)}> 
                Add task
            </button>
            {showModal && (
                <TextModal
                    title="Add Task"
                    submitLabel="Add"
                    placeholder="Task text"
                    onClose={() => setShowModal(false)}
                    onSubmit={(taskTitle) => {
                        addTask(workspaceId, columnId, taskTitle);
                        setShowModal(false);
                    }}
                    validate={validTaskTitle}
                />
            )}
        </>
    );
};