import "../styles/main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import {LoginModal} from "../components/auth/LoginModal";
import { RegisterModal } from "../components/auth/RegisterModal";
import { ConfirmModal } from "../components/modals/ConfirmModal";


export function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const [showLoginConfirmModal, setShowLoginConfirmModal] = useState(false);
    const [showRegisterConfirmModal, setShowRegisterConfirmModal] = useState(false);

    const isAnyModalOpen = showLoginModal || showRegisterModal || showLoginConfirmModal || showRegisterConfirmModal;

    useEffect(() => {
        if (user) {
            navigate("/workspaces");
        }
    }, [user, navigate]);

    return (
        <header>
            <h1>
                <span className="title-deco">KanBan</span> Board
            </h1>

            <p className="desritpion">
                KanBan Board helps teams visualize progress, limit work-in-progress
                (WIP), and identify bottlenecks, improving efficiency and
                communication.
            </p>

            {!isAnyModalOpen && (
                <div className="auth-section">
                    <button
                        type="button"
                        className="auth-button"
                        onClick={() => setShowRegisterModal(true)}
                    >
                        Registration
                    </button>

                    <button
                        type="button"
                        className="auth-button"
                        onClick={() => setShowLoginModal(true)}
                    >
                        Log in
                    </button>
                </div>
            )}

            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginConfirmModal(true)} />
            )}

            {showRegisterModal && (
                <RegisterModal onClose={() => setShowRegisterConfirmModal(true)} />
            )}
            
            {showLoginConfirmModal && (
                <ConfirmModal title="Leave?"
                    message="Close login modal?"
                    onConfirm={() => { setShowLoginConfirmModal(false); setShowLoginModal(false); }}
                    onCancel={() => { setShowLoginConfirmModal(false) }} />
            )}
            {showRegisterConfirmModal && (
                <ConfirmModal title="Leave?"
                    message="Close register modal?"
                    onConfirm={() => { setShowRegisterConfirmModal(false); setShowRegisterModal(false); }}
                    onCancel={() => { setShowRegisterConfirmModal(false) }} />
            )}
        </header>
    );
}
