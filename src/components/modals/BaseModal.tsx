import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import "../../styles/modal.css";

interface BaseModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    zIndex?: number;
    showCloseButton?: boolean;
}

export function BaseModal({
    title,
    onClose,
    children,
    zIndex = 1000,
    showCloseButton = true,
}: BaseModalProps) {
    return createPortal(
        <div className="modal-backdrop" onClick={onClose} style={{zIndex}}>
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
