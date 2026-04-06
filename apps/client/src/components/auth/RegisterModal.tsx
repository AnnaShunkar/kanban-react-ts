import "../../styles/modal.css"
import { type FC } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { BaseModal } from "../modals/BaseModal";
import { AppRoute } from "../../utils/routes";
import { registerSchema, type RegisterFormValues } from "../../schemas/authSchema";
import { useReactForm } from "../../hooks/useReacForm";

interface RegisterModalProps {
  onClose: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({ onClose }) => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors }, } = useReactForm({
    schema: registerSchema,
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });
  const submitForm = async (data: RegisterFormValues): Promise<void> => {
    const success = await registerUser(data.name.trim(), data.email.trim(), data.password.trim());
    if (!success) {
      setError("root", { message: "User already exists or data is invalid", });
      return;
    }

    navigate(AppRoute.WORKSPACES);
  };

  return (
    <BaseModal title="Register" onClose={onClose}>
      <form onSubmit={handleSubmit(submitForm)} className="modal-form">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name?.message ? (
          <p className="form-error">{ errors.name.message}</p>
        ): null}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email?.message ? (
          <p className="form-error">{ errors.email.message}</p>
        ): null}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password?.message ? (
          <p className="form-error">{ errors.password.message}</p>
        ) : null}
        
        {errors.root?.message ? (
          <p className="form-error">{errors.root.message}</p>
        ) : null}

        <button type="submit">Register</button>
      </form>
    </BaseModal>
  );
}
