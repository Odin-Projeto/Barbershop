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

export function ScheduleFormService() {
  const { step, handleNextStep } = useScheduleFormContext();
  const services = useServiceStore((state) => state.services);
  const professionals = useProfessionalStore((state) => state.professionals);
  const currentSchedule = useScheduleStore((state) => state.currentSchedule);
  const setCurrentSchedule = useScheduleStore(
    (state) => state.setCurrentSchedule
  );
  const serviceSelectionForm = useForm();
  const { handleSubmit, watch, setValue } = serviceSelectionForm;
  const navigate = useNavigate();
  const selectedProfessionalId = watch('professional');
  const selectedServiceId = watch('service');

  const formatCurrency = (value?: string) => {
    const cleanedValue = value?.replace(/\D/g, '');
    const numberValue = Number(cleanedValue) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue);
  };

  function handleSelectService(data) {
    setCurrentSchedule({
      idService: data.service,
      idProfessional: data.professional,
      commission: data.commission,
      value: data.value,
    });
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
            <Select.Field name='service'>
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
          </Select.Root>
          <Select.Root>
            <Select.Label>Profissional</Select.Label>
            <Select.Field name='professional'>
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
          </Select.Root>
          <Input.Root>
            <Input.Label>Valor</Input.Label>
            <Input.Field name='value' mask={formatCurrency} readOnly />
          </Input.Root>
          <Input.Root>
            <Input.Label>Comissão profissional </Input.Label>
            <Input.Field name='commission' mask={formatCurrency} readOnly />
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
