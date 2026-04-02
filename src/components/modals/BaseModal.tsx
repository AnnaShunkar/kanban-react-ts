import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import "../../styles/modal.css";

interface BaseModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    zIndex?: number;
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
}

export const BaseModal: FC<BaseModalProps> = ({
    title,
    onClose,
    children,
    zIndex = 1000,
    showCloseButton = true,
    closeOnBackdrop = true,
}) => {
    const handelBackdropClick = (): void => {
        if (closeOnBackdrop) {
            onClose();
        }
    };

    const closeButton = showCloseButton ? (
        <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
        >
            X
        </button>
    ) : null;

    return createPortal(
        <div className="modal-backdrop" onClick={handelBackdropClick} style={{zIndex}}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                {closeButton}

                <h2>{title}</h2>
                {children}
            </div>
        </div>,
        document.body
    );
}
