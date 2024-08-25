import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';

export function ScheduleFormService() {
  const { step, handleNextStep } = useScheduleFormContext();
  const serviceSelectionForm = useForm();
  const { handleSubmit } = serviceSelectionForm;

  function handleSelectService() {
    handleNextStep();
  }

  if (step !== CurrentStep.ServiceSelection) return;

  return (
    <FormProvider {...serviceSelectionForm}>
      <form onSubmit={handleSubmit(handleSelectService)}>
        <Input.Root>
          <Input.Label>Valor</Input.Label>
          <Input.Field name='value' />
        </Input.Root>
        <Input.Root>
          <Input.Label>Comissão profissional </Input.Label>
          <Input.Field name='value' />
        </Input.Root>
        <Button>Avançar para o calendário</Button>
      </form>
    </FormProvider>
  );
}
