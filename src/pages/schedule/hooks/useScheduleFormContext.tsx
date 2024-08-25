/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react';

export enum CurrentStep {
  ServiceSelection = 1,
  TimeSelection = 2,
}

type FormContextProps = {
  step: CurrentStep;
  handlePrevStep: () => void;
  handleNextStep: () => void;
};

const DataContext = createContext<FormContextProps | null>(null);

function ScheduleFormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<CurrentStep>(1);

  function handlePrevStep() {
    setStep((prev) => prev - 1);
  }
  function handleNextStep() {
    setStep((prev) => prev + 1);
  }

  return (
    <DataContext.Provider value={{ step, handlePrevStep, handleNextStep }}>
      {children}
    </DataContext.Provider>
  );
}

const useScheduleFormContext = () => {
  const scheduleFormContext = useContext(DataContext);

  if (!scheduleFormContext) {
    throw new Error('');
  }

  return scheduleFormContext;
};

export { ScheduleFormProvider, useScheduleFormContext };
