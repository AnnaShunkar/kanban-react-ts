import "../../styles/modal.css"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface LoginModalProps {
    onClose: () => void;
}
export default function LoginModal({ onClose }: LoginModalProps) {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const success = await login(name.trim(), password.trim());

        if (!success) {
            return setError("Wrong name or password");
        }
        onClose();
           navigate("/workspaces");
    
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          X
        </button>

        <h2>Log in</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
    )
}
