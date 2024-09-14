import { FormProvider, useForm } from 'react-hook-form';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import ArrowDropDown from '../../assets/arrow_drop_down.svg?react';
import Timer from '../../assets/timer.svg?react';
import { Button } from '../../components/button/button';
import { Select } from '../../components/input/select-field';
import { DatePicker } from '../../components/input/datepicker';

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
      <form
        onSubmit={handleSubmit(handleSelectTime)}
        className='flex flex-col h-full'
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
        <div className='p-4 flex flex-col gap-4'>
          <p className='text-gray-25'>
            Defina informações sobre a data e hora do agendamento
          </p>
          <DatePicker.Root>
            <DatePicker.Label>Data</DatePicker.Label>
            <DatePicker.Field name='date' />
          </DatePicker.Root>
          <Select.Root>
            <Select.Label>Horário</Select.Label>
            <Select.Field name='time'>
              <Select.Trigger>
                <Timer className='h-5 fill-gray-300' />
              </Select.Trigger>
              <Select.Content>
                <Select.Item
                  value={JSON.stringify({ title: 123, value: 1234 })}
                  className='p-1 outline-0 rounded bg-gray-400 hover:brightness-90 hover:cursor-pointer text-gray-25'
                >
                  <Select.ItemText>45 minutos</Select.ItemText>
                  <Select.ItemIndicator>…</Select.ItemIndicator>
                </Select.Item>
              </Select.Content>
            </Select.Field>
          </Select.Root>
          <Select.Root>
            <Select.Label>Duração</Select.Label>
            <Select.Field name='duration'>
              <Select.Trigger>
                <ArrowDropDown className='h-5 fill-gray-300' />
              </Select.Trigger>
              <Select.Content>
                <Select.Item
                  value={JSON.stringify({ title: 123, value: 1234 })}
                  className='p-1 outline-0 rounded bg-gray-400 hover:brightness-90 hover:cursor-pointer text-gray-25'
                >
                  <Select.ItemText>45 minutos</Select.ItemText>
                  <Select.ItemIndicator>…</Select.ItemIndicator>
                </Select.Item>
              </Select.Content>
            </Select.Field>
          </Select.Root>
        </div>
        <div className='p-4 pb-18 flex flex-col flex-1 items-end'>
          <Button className='mt-auto w-full' type='submit' outline>
            Voltar etapa
          </Button>
          <Button className='mt-6 w-full' type='submit'>
            Salvar agendamento
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
