import { forwardRef, HTMLAttributes, useContext } from 'react';
import { useListItem } from '@floating-ui/react';
import { SelectContext } from './context';

export type OptionProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
  value: string;
};

export const Option = forwardRef<HTMLButtonElement, OptionProps>(
  function Option({ value, label, ...props }: OptionProps, elRef) {
    const { handleSelect, selectedValue } = useContext(SelectContext);
    const { ref } = useListItem({ label });

    return (
      <button
        {...props}
        role='option'
        type='button'
        onClick={(e) => {
          handleSelect({ label, value });
          if (props.onClick) {
            props.onClick(e);
          }
        }}
        className={[
          'text-gray-600 text-xs min-h-8 p-2 text-left hover:bg-gray-400 hover:text-gray-100 ease-in-out duration-300 whitespace-nowrap text-ellipsis overflow-hidden bg-transparent top-1 rounded-md w-full',
          selectedValue === value ? 'font-medium' : '',
        ].join(' ')}
        ref={(e) => {
          ref(e);
          if (!elRef || !e) {
            return;
          }
          if (typeof elRef === 'function') {
            elRef(e);
          } else {
            elRef.current = e;
          }
        }}
      >
        {label}
      </button>
    );
  }
);
