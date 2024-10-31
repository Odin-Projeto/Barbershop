import { createContext } from 'react';
import { OptionProps } from './option';

export type SelectContextValue = {
  selectedValue?: string;
  selectedOption?: OptionProps;
  handleSelect: (option: OptionProps) => void;
  name: string;
};

export const SelectContext = createContext<SelectContextValue>(
  {} as SelectContextValue
);
