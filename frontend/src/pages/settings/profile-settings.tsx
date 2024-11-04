import UserIcon from '../../assets/user_circle.svg?react';
import SettingIcon from '../../assets/settings.svg?react';
import ArrowRightIcon from '../../assets/arrow_right.svg?react';
import { useNavigate } from 'react-router-dom';

export function ProfileSettings() {
  const navigate = useNavigate();
  function handleProfessionals() {
    navigate('/professionals');
  }
  function handleLogout() {
    navigate('/');
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 flex items-center gap-2 fixed bg-gray-800 w-full left-0'>
        <img className='' src='odin.png' alt='' width={40} height={40} />
        <h2 className='text-gray-50 font-semibold ml-2'>ODIN</h2>
      </div>
      <section className='p-4 pt-18'>
        <h3 className='flex items-center gap-2 text-gray-25 font-medium py-4'>
          <UserIcon height={16} width={16} className='fill-gray-25' />
          Meu usuário
        </h3>
        <hr className='border-gray-400' />
        <ul className='flex flex-col gap-2 text-gray-25 mt-4'>
          <li className='flex grid grid-cols-[160px_auto]'>
            <small className='text-sm text-gray-300'>Nome </small>
            <strong className='text-sm font-medium'>Guilherme da Silva</strong>
          </li>
          <li className='flex grid grid-cols-[160px_auto]'>
            <small className='text-sm text-gray-300'>E-mail</small>
            <strong className='text-sm font-medium'>email@exemple.com</strong>
          </li>
          <li className='flex grid grid-cols-[160px_auto]'>
            <small className='text-sm text-gray-300'>Contato</small>
            <strong className='text-sm font-medium'>(42) 9 9964-3346</strong>
          </li>
        </ul>
      </section>
      <section className='p-4'>
        <h3 className='flex items-center gap-2 text-gray-25 font-medium py-4'>
          <SettingIcon height={16} width={16} className='fill-gray-25' />
          Configurações
        </h3>
        <hr className='border-gray-400' />
        <div className='flex flex-col gap-4 mt-4'>
          <button
            type='button'
            className='w-full flex justify-between text-gray-25 font-medium'
          >
            Atendimento
            <ArrowRightIcon height={16} className='fill-orange-400' />
          </button>
          <button
            type='button'
            className='w-full flex justify-between text-gray-25 font-medium'
            onClick={handleProfessionals}
          >
            Meus Profissionais
            <ArrowRightIcon height={16} className='fill-orange-400 ' />
          </button>
        </div>
      </section>
      <div className='flex flex-1 pb-18'>
        <button
          className='mt-auto w-full p-4 text-red-400'
          onClick={handleLogout}
        >
          Log out da conta
        </button>
      </div>
    </div>
  );
}
