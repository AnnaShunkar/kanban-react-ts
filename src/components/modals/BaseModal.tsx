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
    function handelBackdropClick() {
        if (closeOnBackdrop) {
            onClose();
        }
    };
    return createPortal(
        <div className="modal-backdrop" onClick={handelBackdropClick} style={{zIndex}}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                {showCloseButton && (
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        X
                    </button>
                )}

                <h2>{title}</h2>
                {children}
            </div>
        </div>,
        document.body
    );
}
