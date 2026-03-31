import { BaseModal } from "./BaseModal";

interface ConfirmModalProps{
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
}
export function ConfirmModal({ title, message, confirmLabel = "Yes", cancelLabel = "No", onConfirm, onCancel, onClose }: ConfirmModalProps) {
    return (
        <BaseModal title={title} onClose={onClose} zIndex={1100} showCloseButton={false}>
            <div className="confirm-modal-content">
                <p>{message}</p>
                <div className="confirm-modal-actions">
                    <button type="button" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                    <button type="button" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
}
