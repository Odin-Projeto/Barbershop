import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import { useNavigate } from 'react-router-dom';

export function ScheduleFormService() {
  const { step, handleNextStep } = useScheduleFormContext();
  const serviceSelectionForm = useForm();
  const { handleSubmit } = serviceSelectionForm;
  const navigate = useNavigate();

  function handleSelectService() {
    handleNextStep();
  }

  function handleReturnPreviousPage() {
    return navigate('/home');
  }

  if (step !== CurrentStep.ServiceSelection) return;

  return (
    <FormProvider {...serviceSelectionForm}>
      <form
        className='flex flex-col h-full'
        onSubmit={handleSubmit(handleSelectService)}
      >
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
            Defina as informações do serviço realizado
          </p>
          <Input.Root>
            <Input.Label>Serviço</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
          <Input.Root>
            <Input.Label>Profissional</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
          <Input.Root>
            <Input.Label>Valor</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
          <Input.Root>
            <Input.Label>Comissão profissional </Input.Label>
            <Input.Field name='value' />
          </Input.Root>
        </div>
        <div className='p-4 pb-18 flex flex-1 items-end'>
          <Button className='w-full' type='submit'>
            Avançar etapa
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
