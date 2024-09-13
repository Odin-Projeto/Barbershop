import * as Select from '@radix-ui/react-select';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';

type FieldProps = {
  children: ReactNode;
  name: string;
};

export function Field({ children, name, ...props }: FieldProps) {
  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <Select.Root
            {...props}
            disabled={field.disabled}
            name={field.name}
            onValueChange={(v) => field.onChange(v)}
          >
            {children}
          </Select.Root>
        );
      }}
    />
  );
}
