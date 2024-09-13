import * as Select from '@radix-ui/react-select';
import { ReactNode } from 'react';

type TriggerProps = {
  children: ReactNode;
};

export function Trigger({ children }: TriggerProps) {
  return (
    <Select.Trigger className='text-sm bg-gray-500 rounded-xl text-gray-300 border border-gray-600 h-10 w-full p-4 disabled:opacity-80 flex items-center justify-between'>
      <Select.Value />
      {children}
    </Select.Trigger>
  );
}
