import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/modal.css"
import "../../styles/board.css"
import { validColumnTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";
import { ConfirmModal } from "../modals/ConfirmModal";

interface AddColumnFormProps{
    workspaceId: string;
}

export function AddColumnForm({ workspaceId }: AddColumnFormProps){
    const { addColumn } = useWorkspaces();
    const [showTextModal, setShowTextModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
   
       return (
           <>
               <button className="add-button" type="button" onClick={() => setShowTextModal(true)}> 
                   Add column
               </button>
               {showTextModal && (
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
