import { HTMLAttributes } from 'react';

export function Root(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className='flex flex-col' />;
}
