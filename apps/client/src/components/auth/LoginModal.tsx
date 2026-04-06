import "../../styles/modal.css";
import type { FC } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { BaseModal } from "../modals/BaseModal";
import { AppRoute } from "../../utils/routes";
import { loginSchema, type LoginFormValues,} from "../../schemas/authSchema";
import { useReactForm } from "../../hooks/useReacForm";

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors }, } = useReactForm({
    schema: loginSchema,
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const submitForm = async (data: LoginFormValues): Promise<void> => {
    const success = await login(data.name.trim(), data.password.trim());

    if (!success) {
      setError("root", {
        message: "Wrong name or password",
      });
      return;
    }

    navigate(AppRoute.WORKSPACES);
  };

  return (
    <BaseModal title="Log in" onClose={onClose}>
      <form onSubmit={handleSubmit(submitForm)} className="modal-form">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
        />

        {errors.name?.message ? (
          <p className="form-error">{errors.name.message}</p>
        ) : null}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password?.message ? (
          <p className="form-error">{errors.password.message}</p>
        ) : null}

        {errors.root?.message ? (
          <p className="form-error">{errors.root.message}</p>
        ) : null}

        <button type="submit">Log in</button>
      </form>
    </BaseModal>
  );
}
