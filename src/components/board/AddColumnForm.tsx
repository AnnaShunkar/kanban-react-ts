import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import "../../styles/modal.css"
import "../../styles/board.css"
import { validColumnTitle } from "../../utils/validation";
import { TextModal } from "../modals/TextModal";

interface AddColumnFormProps{
    workspaceId: string;
}

export function AddColumnForm({ workspaceId }: AddColumnFormProps){
    const { addColumn } = useWorkspaces();
   const [showModal, setShowModal] = useState(false);
   
       return (
           <>
               <button className="add-button" type="button" onClick={() => setShowModal(true)}> 
                   Add column
               </button>
               {showModal && (
                   <TextModal
                       title="Add Column"
                       submitLabel="Add"
                       placeholder="Column title"
                       onClose={() => setShowModal(false)}
                       onSubmit={(columnTitle) => {
                           addColumn(workspaceId, columnTitle);
                           setShowModal(false);
                       }}
                       validate={validColumnTitle}
                   />
               )}
           </>
       );
}
