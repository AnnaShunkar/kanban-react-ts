import "../styles/main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const isAnyModalOpen = isLoginOpen || isRegisterOpen;

    useEffect(() => {
        if (user) {
            navigate("/workspaces");
        }
    }, [user, navigate]);

    return (
        <>
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
                            onClick={() => setIsRegisterOpen(true)}
                        >
                            Registration
                        </button>

                        <button
                            type="button"
                            className="auth-button"
                            onClick={() => setIsLoginOpen(true)}
                        >
                            Log in
                        </button>
                    </div>
                )}

                {isLoginOpen && (
                    <LoginModal onClose={() => setIsLoginOpen(false)} />
                )}

                {isRegisterOpen && (
                    <RegisterModal onClose={() => setIsRegisterOpen(false)} />
                )}
            </header>
        </>
    );
}
