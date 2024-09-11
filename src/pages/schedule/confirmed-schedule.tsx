import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import PencilIcon from '../../assets/pencil.svg?react';
import { Badge } from '../../components/badge/badge';
import { Button } from '../../components/button/button';

export function ConfirmedSchedule() {
  const navigate = useNavigate();
  function handleReturnPreviousPage() {
    navigate('/home');
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 flex items-center gap-2 fixed bg-gray-800 w-full left-0 z-10'>
        <button
          className='bg-gray-600 rounded-full p-1'
          type='button'
          onClick={handleReturnPreviousPage}
        >
          <ArrowLeft height={24} width={24} className='fill-gray-25' />
        </button>
        <h1 className='text-gray-25 text-xl font-semibold'>Agendamento #000</h1>
        <button
          className='bg-gray-600 rounded-full p-1 ml-auto'
          type='button'
          onClick={handleReturnPreviousPage}
        >
          <PencilIcon height={24} width={24} className='fill-gray-25' />
        </button>
      </div>
      <div className='p-4 pt-18 relative'>
        <Badge size='medium' variant='success'>
          Confirmado
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
              <strong className='text-sm font-medium'>12/08/2024</strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Horário</small>
              <strong className='text-sm font-medium'>12/08/2024</strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Duração</small>
              <strong className='text-sm font-medium'>12/08/2024</strong>
            </li>
          </ul>
        </section>
        <section className='mt-6 text-gray-25'>
          <h6 className='text-base font-medium'>Informações do serviço</h6>
          <hr className='mt-4 mb-4 border-gray-400' />
          <ul className='flex flex-col gap-2'>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Serviço</small>
              <strong className='text-sm font-medium'>Corte de cabelo</strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Profissional</small>
              <strong className='text-sm font-medium'>José Ricardo</strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Valor</small>
              <strong className='text-sm font-medium'>R$ 35,00</strong>
            </li>
            <li className='flex grid grid-cols-[160px_auto]'>
              <small className='text-sm text-gray-300'>Comissão</small>
              <strong className='text-sm font-medium'>João da Silva</strong>
            </li>
          </ul>
        </section>
      </div>
      <div className='p-4 pb-18 flex flex-1 items-end gap-3'>
        <Button className='w-full' variant='danger' outline>
          Desmarcar
        </Button>
      </div>
    </div>
  );
}
