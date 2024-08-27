import { FormProvider, useForm } from 'react-hook-form';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';

export function ScheduleFormTime() {
  const { step, handlePrevStep } = useScheduleFormContext();
  const timeSelectionForm = useForm();
  const { handleSubmit } = timeSelectionForm;

  function handleSelectTime() {}

  function handleReturnPreviousPage() {
    handlePrevStep();
  }

  if (step !== CurrentStep.TimeSelection) return;

  return (
    <FormProvider {...timeSelectionForm}>
      <form onSubmit={handleSubmit(handleSelectTime)}>
        <div className='flex p-4 items-center gap-4'>
          <button
            className='bg-gray-600 rounded-full p-1'
            type='button'
            onClick={handleReturnPreviousPage}
          >
            <ArrowLeft height={24} width={24} className='fill-gray-25' />
          </button>
          <h1 className='text-gray-25'>Novo agendamento</h1>
        </div>
        <div className='p-4 flex flex-col gap-4'>
          <p className='text-gray-25'>
            Defina informações sobre a data e hora do agendamento
          </p>
          <Input.Root>
            <Input.Label>Data</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
          <Input.Root>
            <Input.Label>Horário</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
          <Input.Root>
            <Input.Label>Duração do serviço</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
        </div>
        <div className='p-4'>
          <Button className='w-full' type='submit'>
            Avançar etapa
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
