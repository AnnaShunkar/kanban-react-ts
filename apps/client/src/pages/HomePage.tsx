import "../styles/main.css";
import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import {LoginModal} from "../components/auth/LoginModal";
import { RegisterModal } from "../components/auth/RegisterModal";
import { ConfirmModal } from "../components/modals/ConfirmModal";
import { AppRoutes } from "../utils/routes";
import { ModalKeys } from "../utils/modalKeys";


export const HomePage: FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [activeModal, setActiveModal] = useState<ModalKeys | null>(null);
    const [activeConfirmModal, setActiveConfirmModal] = useState<ModalKeys | null>(null);

    const isAnyModalOpen = activeModal !== null || activeConfirmModal !== null;

    const authSection = !isAnyModalOpen ? (
        <div className="auth-section">
            <button
                type="button"
                className="auth-button"
                onClick={() => setActiveModal(ModalKeys.Register)}
            >
                Registration
            </button>

            <button
                type="button"
                className="auth-button"
                onClick={() => setActiveModal(ModalKeys.Login)}
            >
                Log in
            </button>
        </div>
    ) : null;

    const loginModal = activeModal === ModalKeys.Login ? (
        <LoginModal onClose={() => setActiveConfirmModal(ModalKeys.LoginConfirm)} />
    ) : null;

    const registerModal = activeModal === ModalKeys.Register ? (
        <RegisterModal onClose={() => setActiveConfirmModal(ModalKeys.RegisterConfirm)} />
    ) : null;

    const loginConfirmModal = activeConfirmModal === ModalKeys.LoginConfirm ? (
        <ConfirmModal title="Leave?"
            message="Close login modal?"
            onConfirm={() => {
                setActiveConfirmModal(null);
                setActiveModal(null);
            }}
            onCancel={() => { setActiveConfirmModal(null) }} />
    ) : null;

    const registerConfirmModal = activeConfirmModal === ModalKeys.RegisterConfirm ? (
        <ConfirmModal title="Leave?"
            message="Close register modal?"
            onConfirm={() => {
                setActiveConfirmModal(null);
                setActiveModal(null);
            }}
            onCancel={() => { setActiveConfirmModal(null) }} />
    ) : null;

    useEffect(() => {
        if (user) {
            navigate(AppRoutes.Workspaces);
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

            {authSection}
            {loginModal}
            {registerModal}
            {loginConfirmModal}
            {registerConfirmModal}
        </header>
    );
}
