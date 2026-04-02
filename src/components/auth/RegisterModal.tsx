import "../../styles/modal.css"
import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { BaseModal } from "../modals/BaseModal";
import { validEmail, validPassword } from "../../utils/validation";
import { AppRoutes } from "../../utils/routes";

interface RegisterModalProps {
  onClose: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({onClose}) =>  {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const errorMessage = error ? <p className="form-error">{error}</p> : null;

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    const validEmailError = validEmail(email);
    if (validEmailError) {
      setError(validEmailError);
      return;
    }

    const validPasswordError = validPassword(password);
    if (validPasswordError) {
      setError(validPasswordError);
      return;
    }

    const success = await register(
      name.trim(),
      email.trim(),
      password.trim()
    );
    if (!success) {
      setError("User already exists or data is invalid");
      return;
    }
    navigate(AppRoutes.Workspaces);
  }

  return (
    <BaseModal title="Register" onClose={onClose}>
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        {errorMessage}

        <button type="submit">Register</button>
      </form>
    </BaseModal>
  );
}
