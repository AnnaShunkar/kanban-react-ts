import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { BaseModal } from './BaseModal';

interface TextModalFormValues {
  value: string;
}

interface TextModalProps {
  title: string;
  submitLabel: string;
  initialValue?: string;
  placeholder?: string;
  onClose: () => void;
  onSubmit: (value: string) => Promise<void> | void;
  schema: z.ZodObject<{
    value: z.ZodString;
  }>;
}

export const TextModal: FC<TextModalProps> = ({
  title,
  submitLabel,
  initialValue = '',
  placeholder = 'Enter text...',
  onClose,
  onSubmit,
  schema,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextModalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: initialValue,
    },
  });

  const submitForm: SubmitHandler<TextModalFormValues> = async (data) => {
    await onSubmit(data.value.trim());
  };

  const errorMessage = errors.value?.message ? (
    <p className="form-error">{errors.value.message}</p>
  ) : null;

  return (
    <BaseModal title={title} onClose={onClose} zIndex={1000}>
      <form onSubmit={handleSubmit(submitForm)} className="modal-form">
        <input type="text" placeholder={placeholder} {...register('value')} />

        {errorMessage}

        <button type="submit">{submitLabel}</button>
      </form>
    </BaseModal>
  );
};
