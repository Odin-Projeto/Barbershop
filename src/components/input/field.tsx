import { InputHTMLAttributes, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Eye from '../../assets/eye.svg?react';
import EyeHideIcon from '../../assets/eye_slash.svg?react';

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  mask?: (value?: string) => string;
};

export function Field({ name = '', mask = undefined, ...props }: FieldProps) {
  const { register, setValue } = useFormContext();
  const inputValue: string = useWatch({ name });
  const passwordClasses = props.type === 'password' ? 'pr-10' : '';
  const additionalClasses = passwordClasses;
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePasswordView() {
    setShowPassword((prev) => !prev);
  }

  useEffect(() => {
    if (mask) {
      setValue(name, mask(inputValue));
    }
  }, [inputValue]);

  return (
    <div className='flex relative items-center'>
      <input
        {...register(name)}
        {...props}
        id={name}
        type={showPassword ? 'text' : 'password'}
        className={`text-sm bg-gray-500 rounded-xl text-gray-300 border border-gray-600 h-10 p-4 disabled:opacity-80 ${additionalClasses}`}
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
