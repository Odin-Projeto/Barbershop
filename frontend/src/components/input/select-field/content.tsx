import * as Select from '@radix-ui/react-select';
import { HTMLAttributes, ReactNode } from 'react';

type ContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Content({ children, ...props }: ContentProps) {
  return (
    <Select.Content
      {...props}
      position='popper'
      sideOffset={5}
      className='SelectContent z-10'
    >
      <Select.Viewport className='bg-gray-400 p-2 top-1 rounded-md w-full'>
        {children}
      </Select.Viewport>
    </Select.Content>
  );
}
