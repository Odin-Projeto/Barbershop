import React, {
  Children,
  HTMLAttributes,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';
import ArrowDropDown from '../../../assets/arrow_drop_down.svg?react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { OptionProps } from './option';
import { SelectContext } from './context';

type FieldProps = HTMLAttributes<HTMLButtonElement> & {
  name: string;
  placeholder?: string;
  children: ReactNode;
};

export function Field({ name, children, placeholder, ...props }: FieldProps) {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const {
    field: { onChange, ...rest },
  } = useController({
    control,
    defaultValue: '',
    name,
  });
  const [selectedOption, setSelectedOption] = useState<OptionProps>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selectedValue = selectedOption?.value;
  const labelText = selectedOption?.label ?? placeholder;
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  });
  const isOptionProps = (
    child: React.ReactNode
  ): child is React.ReactElement<OptionProps> => {
    return (
      React.isValidElement(child) &&
      child.props.label !== undefined &&
      child.props.value !== undefined
    );
  };
  const child = Children.toArray(children).find((child: React.ReactNode) => {
    return isOptionProps(child) && child.props.value === rest.value;
  });
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });
  const typeAhead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: handleTypeAheadMatch,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const { getFloatingProps } = useInteractions([
    listNav,
    typeAhead,
    click,
    dismiss,
    role,
  ]);

  function handleTypeAheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    }
  }

  function handleSelect(option: OptionProps) {
    onChange(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  }

  function handleToggleList() {
    setIsOpen((prev) => !prev);
  }

  const selectContext = useMemo(
    () => ({
      handleSelect,
      selectedValue,
      selectedOption,
      name,
    }),
    [handleSelect]
  );

  return (
    <div className='relative'>
      <input type='text' {...rest} onChange={onChange} className='hidden' />
      <button
        {...props}
        ref={refs.setReference}
        type='button'
        tabIndex={0}
        onClick={handleToggleList}
        className={[
          'text-sm bg-gray-500 rounded-xl text-gray-300 border border-gray-600 h-10 w-full p-4 disabled:opacity-80 flex items-center justify-between',
        ].join(' ')}
      >
        <span className='whitespace-nowrap text-ellipsis overflow-hidden pr-[1px]'>
          {isOptionProps(child) && child?.props.label
            ? child.props.label
            : labelText}
        </span>
        <ArrowDropDown className='h-5 w-5' />
      </button>
      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              className='w-full bg-gray-300 rounded-md shadow border border-gray-300 flex flex-col max-h-56 overflow-auto z-10'
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </div>
  );
}
