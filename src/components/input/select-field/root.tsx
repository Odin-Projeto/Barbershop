import { HTMLAttributes } from 'react';
import './index.css';

export function Root(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className='flex flex-col' />;
}
