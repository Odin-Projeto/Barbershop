import { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'primary' | 'success' | 'warning' | 'danger';
type ButtonSizes = 'small' | 'medium' | 'large';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  outline?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'large',
  outline,
  children,
  ...props
}: ButtonProps) {
  const variantStyle = {
    primary: outline
      ? 'border border-orange-400 text-orange-400'
      : 'bg-orange-400 shadow-xs shadow-orange-200/50',
    success: outline
      ? 'border border-green-400 text-green-400'
      : 'bg-green-400 shadow-xs shadow-green-200/50',
    warning: outline
      ? 'border border-yellow-400 text-yellow-400'
      : 'bg-yellow-400 shadow-xs shadow-yellow-200/50',
    danger: outline
      ? 'border border-red-400 text-red-400'
      : 'bg-red-400 shadow-xs shadow-red-200/50',
  };
  const sizeStyle = {
    small: 'h-[13px] p-2',
    medium: 'h-[27px] p-2',
    large: 'h-[51px] p-4',
  };
  const additionalClasses = props.className ? ` ${props.className}` : '';

  return (
    <button
      {...props}
      className={`rounded-xl flex items-center text-md text-gray-800 font-bold ${variantStyle[variant]} ${sizeStyle[size]}${additionalClasses}`}
    >
      {children}
    </button>
  );
}
