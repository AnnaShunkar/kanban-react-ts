import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export const useReactForm = <TShape extends z.ZodRawShape>({
  schema,
  ...props
}: {
  schema: z.ZodObject<TShape>;
} & Omit<
  UseFormProps<
    z.input<z.ZodObject<TShape>>,
    unknown,
    z.output<z.ZodObject<TShape>>
  >,
  'resolver'
>) => {
  return useForm<
    z.input<z.ZodObject<TShape>>,
    unknown,
    z.output<z.ZodObject<TShape>>
  >({
    mode: 'onChange',
    ...props,
    resolver: zodResolver(schema),
  });
};
