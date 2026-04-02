import { useState, type FC } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/modal.css"
import "../../styles/board.css"
import { validColumnTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";
import { ConfirmModal } from "../modals/ConfirmModal";


interface AddColumnFormProps{
    workspaceId: string;
}

export const AddColumnForm: FC<AddColumnFormProps> = ({ workspaceId }) => {
    const { addColumn } = useWorkspaces();
    const [showTextModal, setShowTextModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const confirmModal = showConfirmModal ? (
        <ConfirmModal title="Leave?"
            message="Close column modal?"
            onConfirm={() => { setShowConfirmModal(false); setShowTextModal(false); }}
            onCancel={() => { setShowConfirmModal(false) }}
        />
    ) : null;
    const textModal = showTextModal ? (
        <TextModal
            title="Add Column"
            submitLabel="Add"
            placeholder="Column title"
            onClose={() => setShowConfirmModal(true)}
            onSubmit={(columnTitle) => {
                addColumn(workspaceId, columnTitle);
                setShowTextModal(false);
            }}
            validate={validColumnTitle}
        />
    ) : null;
   
       return (
           <>
               <button className="add-button" type="button" onClick={() => setShowTextModal(true)}> 
                   Add column
               </button>
               {textModal}
               {confirmModal}
           </>
       );
}
