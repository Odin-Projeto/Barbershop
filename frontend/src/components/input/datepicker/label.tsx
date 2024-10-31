import { LabelHTMLAttributes } from 'react';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className='text-gray-25 text-xs' />;
}
