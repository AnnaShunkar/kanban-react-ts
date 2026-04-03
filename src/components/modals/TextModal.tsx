import { type FC } from "react";
import { useForm, type SubmitHandler, type Resolver,} from "react-hook-form";
import { BaseModal } from "./BaseModal";

interface TextModalFormValues {
  value: string;
}

interface TextModalProps {
  title: string;
  submitLabel: string;
  initialValue?: string;
  placeholder?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
  resolver: Resolver<TextModalFormValues>;
}

export const TextModal: FC<TextModalProps> = ({
  title,
  submitLabel,
  initialValue = "",
  placeholder = "Enter text...",
  onClose,
  onSubmit,
  resolver,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextModalFormValues>({
    resolver,
    defaultValues: {
      value: initialValue,
    },
  });

  const submitForm: SubmitHandler<TextModalFormValues> = (data) => {
    onSubmit(data.value.trim());
  };

  const errorMessage = errors.value?.message ? (
    <p className="form-error">{errors.value.message}</p>
  ) : null;

  return (
    <BaseModal title={title} onClose={onClose} zIndex={1000}>
      <form onSubmit={handleSubmit(submitForm)} className="modal-form">
        <input
          type="text"
          placeholder={placeholder}
          {...register("value")}
        />

        {errorMessage}

        <button type="submit">{submitLabel}</button>
      </form>
    </BaseModal>
  );
};
