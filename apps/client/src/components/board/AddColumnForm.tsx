import { useState, type FC } from 'react';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import '../../styles/modal.css';
import '../../styles/board.css';
import { TextModal } from '../modals/TextModal';
import { ConfirmModal } from '../modals/ConfirmModal';
import { ModalKeys } from '../../utils/modalKeys';
import { columnFormSchema } from '../../schemas/entitySchema';

interface AddColumnFormProps {
  workspaceId: string;
}

export const AddColumnForm: FC<AddColumnFormProps> = ({ workspaceId }) => {
  const { addColumn } = useWorkspaces();
  const [activeModal, setActiveModal] = useState<ModalKeys | null>(null);
  const [activeConfirmModal, setActiveConfirmModal] =
    useState<ModalKeys | null>(null);

  const confirmModal =
    activeConfirmModal === ModalKeys.AddColumnConfirm ? (
      <ConfirmModal
        title="Leave?"
        message="Close column modal?"
        onConfirm={() => {
          setActiveConfirmModal(null);
          setActiveModal(null);
        }}
        onCancel={() => {
          setActiveConfirmModal(null);
        }}
      />
    ) : null;

  const textModal =
    activeModal === ModalKeys.AddColumn ? (
      <TextModal
        title="Add Column"
        submitLabel="Add"
        placeholder="Column title"
        onClose={() => setActiveConfirmModal(ModalKeys.AddColumnConfirm)}
        onSubmit={(columnTitle) => {
          addColumn(workspaceId, columnTitle);
          setActiveModal(null);
        }}
        schema={columnFormSchema}
      />
    ) : null;

  return (
    <>
      <button
        className="add-button"
        type="button"
        onClick={() => setActiveModal(ModalKeys.AddColumn)}
      >
        Add column
      </button>
      {textModal}
      {confirmModal}
    </>
  );
};
