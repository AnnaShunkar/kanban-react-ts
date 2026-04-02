import "../../styles/modal.css"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { BaseModal } from "../modals/BaseModal";
import type { FC } from "react";

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ onClose }) =>  {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    const success = await login(name.trim(), password.trim());

    if (!success) {
      setError("Wrong name or password");
      return;
    }

    navigate("/workspaces");
  }

  return (
    <BaseModal title="Log in" onClose={onClose}>
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Log in</button>
      </form>
    </BaseModal>
  );
}
