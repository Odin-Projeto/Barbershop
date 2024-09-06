import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Eye from '../../assets/eye.svg?react';
import EyeHideIcon from '../../assets/eye_slash.svg?react';

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  mask?: (value?: string) => string;
  autoFocus?: boolean;
};

export function Field({
  name = '',
  mask = undefined,
  autoFocus = undefined,
  ...props
}: FieldProps) {
  const { register, setValue } = useFormContext();
  const { ref, ...rest } = register('firstName');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputValue: string = useWatch({ name });
  const passwordClasses = props.type === 'password' ? 'pr-10' : '';
  const additionalClasses = passwordClasses;
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePasswordView() {
    setShowPassword((prev) => !prev);
  }

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (mask) {
      setValue(name, mask(inputValue));
    }
  }, [inputValue]);

  return (
    <div className='flex relative items-center'>
      <input
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        {...props}
        id={name}
        type={showPassword ? 'password' : 'text'}
        className={`text-sm bg-gray-500 rounded-xl text-gray-300 border border-gray-600 h-10 w-full p-4 disabled:opacity-80 ${additionalClasses}`}
      />

      {props.type === 'password' && (
        <button
          className='absolute fill-gray-300 right-4'
          onClick={handleTogglePasswordView}
        >
          {!showPassword && <Eye width={18} height={18} />}
          {showPassword && <EyeHideIcon width={18} height={18} />}
        </button>
      )}
    </div>
  );
}
