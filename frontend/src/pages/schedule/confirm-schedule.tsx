import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import PencilIcon from '../../assets/pencil.svg?react';
import { Badge } from '../../components/badge/badge';
import { Button } from '../../components/button/button';
import { useScheduleStore } from './store';
import { format } from 'date-fns';
import { useModal } from '../../hooks/useModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getScheduleById } from '../../services/requests/getScheduleById';
import { formatTime, normalizeCurrency } from '../../utils';
import { confirmSchedule } from '../../services/requests/confirmSchedule';
import { cancelSchedule } from '../../services/requests/cancelSchedule';

type ScheduleState = {
  id?: string;
};

export function ConfirmSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { Modal, handleOpenModal, handleCloseModal } = useModal();
  const scheduleState = location.state as ScheduleState;
  // const confirmSchedule = useScheduleStore((state) => state.confirmSchedule);
  const uncheckSchedule = useScheduleStore((state) => state.uncheckSchedule);
  const { data: schedule } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => getScheduleById(Number(id || 0)),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const confirmScheduleMutation = useMutation({
    mutationFn: confirmSchedule,
  });
  const cancelScheduleMutation = useMutation({
    mutationFn: cancelSchedule,
  });

  function handleReturnPreviousPage() {
    navigate('/home');
  }
  function handleConfirmSchedule() {
    // confirmSchedule(scheduleState.id ?? '');
    confirmScheduleMutation.mutate(Number(id ?? 0));
    handleReturnPreviousPage();
    handleCloseModal();
  }
  function handleUncheckSchedule() {
    cancelScheduleMutation.mutate(Number(id ?? 0));
    handleReturnPreviousPage();
    handleCloseModal();
  }

  if (!schedule) return <></>;

  return (
    <div className='flex flex-col h-full'>
      <div className='flex p-4 items-center gap-4 fixed bg-gray-800 w-full z-10 left-0'>
        <button
          className='bg-gray-600 rounded-full p-1'
          type='button'
          onClick={handleReturnPreviousPage}
        >
          <ArrowLeft height={24} width={24} className='fill-gray-25' />
        </button>
        <h1 className='text-gray-25 text-xl font-semibold'>
          Agendamento #{schedule.id}
        </h1>
        <button
          className='bg-gray-600 rounded-full p-1 ml-auto'
          type='button'
          onClick={handleReturnPreviousPage}
        >
          <PencilIcon height={24} width={24} className='fill-gray-25' />
        </button>
      </div>
      <div className='p-4 pt-18 relative'>
        <Badge
          size='medium'
          variant={schedule.status === 'CONFIRMADO' ? 'success' : 'warning'}
        >
          {schedule.status === 'CONFIRMADO' ? 'Confirmado' : 'Marcado'}
        </Badge>
        <section className='text-gray-25 mt-6'>
          <h6 className='text-base font-medium'>Cliente</h6>
          <hr className='mt-4 mb-4 border-gray-400' />
          <ul className='flex flex-col gap-2'>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Nome</small>
              <strong className='text-sm font-medium'>João da Silva</strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Contato</small>
              <strong className='text-sm font-medium'>(42)9 9933-3333</strong>
            </li>
          </ul>
        </section>
        <section className='mt-6 text-gray-25'>
          <h6 className='text-base font-medium'>Agendamento</h6>
          <hr className='mt-4 mb-4 border-gray-400' />
          <ul className='flex flex-col gap-2'>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Data</small>
              <strong className='text-sm font-medium'>
                {format(schedule.dataHora, 'dd/MM/yyyy')}
              </strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Horário</small>
              <strong className='text-sm font-medium'>
                {formatTime(schedule.dataHora)}
              </strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Duração</small>
              <strong className='text-sm font-medium'>
                {schedule.Servico.duracao} minutos
              </strong>
            </li>
          </ul>
        </section>
        <section className='mt-6 text-gray-25'>
          <h6 className='text-base font-medium'>Informações do serviço</h6>
          <hr className='mt-4 mb-4 border-gray-400' />
          <ul className='flex flex-col gap-2'>
            <li className='grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Serviço</small>
              <strong className='text-sm font-medium'>
                {schedule?.Servico.nome}
              </strong>
            </li>
            <li className='grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Profissional</small>
              <strong className='text-sm font-medium'>
                {schedule?.Profissional.nome}
              </strong>
            </li>
            <li className=' grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Valor</small>
              <strong className='text-sm font-medium'>
                {normalizeCurrency(`${schedule.valor.toFixed(2)}`)}
              </strong>
            </li>
            <li className='grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Comissão</small>
              <strong className='text-sm font-medium'>{schedule.id}%</strong>
            </li>
          </ul>
        </section>
      </div>
      <div className='p-4 pb-18 flex flex-1 items-end gap-3'>
        {schedule.status === 'CONFIRMADO' && (
          <Button
            className='w-full'
            variant='danger'
            outline
            onClick={handleOpenModal}
          >
            Desmarcar
          </Button>
        )}
        <Modal title='Confirmar agendamento?'>
          <div className='w-full'>
            <div>
              <h6 className='text-center text-xl font-semibold text-gray-25'>
                #{schedule.id}
              </h6>
              <Button
                variant={
                  schedule.status === 'CONFIRMADO' ? 'danger' : 'success'
                }
                className='mt-8 w-full'
                onClick={
                  schedule.status === 'CONFIRMADO'
                    ? handleUncheckSchedule
                    : handleConfirmSchedule
                }
              >
                {schedule.status === 'CONFIRMADO' ? 'Desmarcar' : 'Confirmar'}
              </Button>
            </div>
          </div>
        </Modal>
        {schedule.status === 'MARCADO' && (
          <>
            <Button
              className='w-full'
              variant='success'
              onClick={handleOpenModal}
            >
              Confirmar
            </Button>
            <Button
              className='w-full'
              variant='danger'
              onClick={handleOpenModal}
            >
              Desmarcar
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
