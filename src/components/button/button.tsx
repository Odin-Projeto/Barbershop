import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: string;
};

export function Button({ variant, children }: ButtonProps) {
  return <button>{children}</button>;
}
