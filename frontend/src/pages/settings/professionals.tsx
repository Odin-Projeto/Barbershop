import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import AddIcon from '../../assets/plus.svg?react';
import Pencil from '../../assets/pencil.svg?react';
import { useQuery } from '@tanstack/react-query';
import { getProfessionals } from '../../services/requests/getProfessionals';

export function Professionals() {
  const navigate = useNavigate();
  const { data: professionals } = useQuery({
    queryKey: ['professionals'],
    queryFn: getProfessionals,
  });
  function handleReturnPreviousPage() {
    navigate('/home');
  }
  function handleNewProfessional() {
    navigate('/professional-form');
  }
  function handleEditProfessional(id: number) {
    navigate(`/professional-form?id=${id}`);
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
        <h1 className='text-gray-25'>Meus profissionais</h1>
      </div>

      <div className='pt-18 p-4 flex flex-col gap-4 relative'>
        <div className='flex justify-between'>
          <h2 className='text-white font-medium text-lg'>Cadastrados</h2>
          <button
            className='rounded-full bg-orange-400 p-2'
            type='button'
            onClick={handleNewProfessional}
          >
            <AddIcon className='h-6' />
          </button>
        </div>
        <hr />
        <div>
          <ul className='flex flex-col gap-2'>
            {professionals?.map((item, index) => (
              <li key={index} className='flex justify-between items-start'>
                <div>
                  <p className='text-white font-medium'>{item.nome}</p>
                  <p className='text-gray-400'>{item.email}</p>
                  <p className='text-gray-400'>{item.telefone}</p>
                </div>
                <button
                  className='rounded-full bg-gray-600 p-2'
                  type='button'
                  onClick={() => handleEditProfessional(item.id)}
                >
                  <Pencil className='h-6 fill-white' />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
