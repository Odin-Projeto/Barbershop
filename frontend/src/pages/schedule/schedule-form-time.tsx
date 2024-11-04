import { FormProvider, useForm } from 'react-hook-form';
import {
  CurrentStep,
  useScheduleFormContext,
} from './hooks/useScheduleFormContext';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import { Button } from '../../components/button/button';
import { Select } from '../../components/input/select-field';
import { DatePicker } from '../../components/input/datepicker';
import { useNavigate } from 'react-router-dom';
import { useScheduleStore } from './store';
import { parse } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuid } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchdule } from '../../services/requests/creteSchedule';
import { formatCurrencyToNumber } from '../../utils/formatCurrencyToNumber';

const serviceTimeFormSchema = z.object({
  date: z.coerce.string().min(1, 'Campo obrigatório'),
  time: z.coerce.string().min(1, 'Campo obrigatório'),
});

const times = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

type ServiceTimeFormData = z.infer<typeof serviceTimeFormSchema>;

export function ScheduleFormTime() {
  const navigate = useNavigate();
  const { step, handlePrevStep } = useScheduleFormContext();
  const timeSelectionForm = useForm<ServiceTimeFormData>({
    resolver: zodResolver(serviceTimeFormSchema),
    defaultValues: {
      date: '',
      time: '',
    },
  });
  const { handleSubmit } = timeSelectionForm;
  const setCurrentSchedule = useScheduleStore(
    (state) => state.setCurrentSchedule
  );
  const currentSchedule = useScheduleStore((state) => state.currentSchedule);
  const addSchedule = useScheduleStore((state) => state.addSchedule);
  const queryClient = useQueryClient();
  const creteSchedule = useMutation({
    mutationFn: createSchdule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
        exact: true,
      });
    },
  });

  function handleSelectTime(data: ServiceTimeFormData) {
    if (currentSchedule) {
      setCurrentSchedule({
        ...currentSchedule,
        date: parse(data.date, 'dd/MM/yyyy', new Date()),
        time: data.time,
        id: uuid(),
      });
      addSchedule();
      const dateTimeString = `${data.date} ${data.time}`;
      const parsedDate = parse(dateTimeString, 'dd/MM/yyyy HH:mm', new Date());
      creteSchedule.mutate({
        comissao_profissional: Number(currentSchedule.commission),
        dataHora: parsedDate,
        profissional_id: Number(currentSchedule.idProfessional),
        servico_id: Number(currentSchedule.idService),
        status: 'MARCADO',
        valor: formatCurrencyToNumber(currentSchedule.value ?? 0),
      });
      navigate('/search-schedules');
    }
  }

  function handleReturnPreviousPage() {
    return navigate('/home');
  }

  function handleReturnPreviousStep() {
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
            <DatePicker.ErrorMessage field='date' />
          </DatePicker.Root>
          <Select.Root>
            <Select.Label>Horário</Select.Label>
            <Select.Field name='time'>
              {times.map((time, index) => (
                <Select.Option key={index} label={time} value={time} />
              ))}
            </Select.Field>
          </Select.Root>
        </div>
        <div className='p-4 pb-18 flex flex-col flex-1 items-end'>
          <Button
            className='mt-auto w-full'
            type='button'
            outline
            onClick={handleReturnPreviousStep}
          >
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
