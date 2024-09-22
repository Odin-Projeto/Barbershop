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
import { useProfessionalStore, useServiceStore } from '../settings/store';
import { useEffect } from 'react';
import { useScheduleStore } from './store';
import { z } from 'zod';
import { normalizeCurrency } from '../../utils';
import { zodResolver } from '@hookform/resolvers/zod';

const serviceFormSchema = z.object({
  idService: z.string().min(1, 'Campo obrigatório'),
  idProfessional: z.string().min(1, 'Campo obrigatório'),
  commission: z.string(),
  value: z.string(),
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

export function ScheduleFormService() {
  const { step, handleNextStep } = useScheduleFormContext();
  const services = useServiceStore((state) => state.services);
  const professionals = useProfessionalStore((state) => state.professionals);
  const setCurrentSchedule = useScheduleStore(
    (state) => state.setCurrentSchedule
  );
  const serviceSelectionForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      idService: '',
      idProfessional: '',
    },
  });
  const { handleSubmit, watch, setValue, formState } = serviceSelectionForm;
  const navigate = useNavigate();
  const selectedProfessionalId = watch('idProfessional');
  const selectedServiceId = watch('idService');
  console.log(formState);
  function handleSelectService(data: ServiceFormData) {
    setCurrentSchedule({ ...data, confirmed: false });
    handleNextStep();
  }

  function handleReturnPreviousPage() {
    return navigate('/home');
  }

  useEffect(() => {
    const selectedProfessional = professionals.find(
      (item) => item.id === selectedProfessionalId
    );
    const selectedService = selectedProfessional?.services.find(
      (item) => item.serviceId === selectedServiceId
    );
    setValue('commission', selectedService?.commission.toFixed(2));
    setValue('value', selectedService?.value.toFixed(2));
  }, [selectedProfessionalId, selectedServiceId]);

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
            <Select.Field name='idService'>
              <Select.Trigger>
                <ArrowDropDown className='h-5 fill-gray-300' />
              </Select.Trigger>
              <Select.Content>
                {services.map((service, index) => (
                  <Select.Item
                    key={index}
                    value={service.id || ''}
                    className='p-1 outline-0 rounded bg-gray-400 hover:brightness-90 hover:cursor-pointer text-gray-25'
                  >
                    <Select.ItemText>{service.name}</Select.ItemText>
                    <Select.ItemIndicator>…</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Field>
            <Select.ErrorMessage field='idService' />
          </Select.Root>
          <Select.Root>
            <Select.Label>Profissional</Select.Label>
            <Select.Field name='idProfessional'>
              <Select.Trigger>
                <ArrowDropDown className='h-5 fill-gray-300' />
              </Select.Trigger>
              <Select.Content>
                {professionals.map((professional, index) => (
                  <Select.Item
                    key={index}
                    value={professional.id || ''}
                    className='p-1 outline-0 rounded bg-gray-400 hover:brightness-90 hover:cursor-pointer text-gray-25'
                  >
                    <Select.ItemText>{professional.name}</Select.ItemText>
                    <Select.ItemIndicator>…</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Field>
            <Select.ErrorMessage field='idProfessional' />
          </Select.Root>
          <Input.Root>
            <Input.Label>Valor</Input.Label>
            <Input.Field name='value' mask={normalizeCurrency} readOnly />
            {/* <Select.ErrorMessage field='value' /> */}
          </Input.Root>
          <Input.Root>
            <Input.Label>Comissão profissional </Input.Label>
            <Input.Field name='commission' mask={normalizeCurrency} readOnly />
            {/* <Select.ErrorMessage field='commission' /> */}
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
