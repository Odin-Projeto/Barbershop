import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import { useNavigate } from 'react-router-dom';
import { Select } from '../../components/input/select-field';
import ArrowDropDown from './../../assets/arrow_drop_down.svg?react';

export function ScheduleFormService() {
  const { step, handleNextStep } = useScheduleFormContext();
  const serviceSelectionForm = useForm();
  const { handleSubmit } = serviceSelectionForm;
  const navigate = useNavigate();

  function handleSelectService(data) {
    console.log(data);
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
        <div className='p-4 flex items-center gap-2 fixed bg-gray-800 w-full left-0 z-10'>
          <button
            className='bg-gray-600 rounded-full p-1'
            type='button'
            onClick={handleReturnPreviousPage}
          >
            <ArrowLeft height={24} width={24} className='fill-gray-25' />
          </button>
          <h1 className='text-gray-25'>Novo agendamento</h1>
        </div>
        <div className='pt-18 p-4 flex flex-col gap-4 relative'>
          <p className='text-gray-25'>
            Defina as informações do serviço realizado
          </p>
          <Select.Root>
            <Select.Label>Serviço</Select.Label>
            <Select.Field name='service'>
              <Select.Trigger>
                <ArrowDropDown className='h-5 fill-gray-300' />
              </Select.Trigger>
              <Select.Content>
                <Select.Item
                  value={JSON.stringify({ title: 123, value: 1234 })}
                  className='p-1 outline-0 rounded hover:bg-gray-600 hover:cursor-pointer text-gray-25'
                >
                  <Select.ItemText>Barba</Select.ItemText>
                  <Select.ItemIndicator>…</Select.ItemIndicator>
                </Select.Item>
              </Select.Content>
            </Select.Field>
          </Select.Root>
          <Select.Root>
            <Select.Label>Profissional</Select.Label>
            <Select.Field name='professional'>
              <Select.Trigger>
                <ArrowDropDown className='h-5 fill-gray-300' />
              </Select.Trigger>
              <Select.Content>
                <Select.Item
                  value={JSON.stringify({ title: 123, value: 1234 })}
                  className='p-1 outline-0 rounded hover:bg-gray-600 hover:cursor-pointer text-gray-25'
                >
                  <Select.ItemText>João da Silva</Select.ItemText>
                  <Select.ItemIndicator>…</Select.ItemIndicator>
                </Select.Item>
              </Select.Content>
            </Select.Field>
          </Select.Root>
          <Input.Root>
            <Input.Label>Valor</Input.Label>
            <Input.Field name='value' />
          </Input.Root>
          <Input.Root>
            <Input.Label>Comissão profissional </Input.Label>
            <Input.Field name='commission' />
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
