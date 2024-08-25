import { FormProvider, useForm } from 'react-hook-form';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';

export function ScheduleFormTime() {
  const { step } = useScheduleFormContext();
  const timeSelectionForm = useForm();
  const { handleSubmit } = timeSelectionForm;

  function handleSelectTime() {}

  if (step !== CurrentStep.TimeSelection) return;

  return (
    <FormProvider {...timeSelectionForm}>
      <form onSubmit={handleSubmit(handleSelectTime)}>
        <div></div>
      </form>
    </FormProvider>
  );
}
