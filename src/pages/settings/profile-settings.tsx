import UserIcon from '../../assets/user_circle.svg?react';
import SettingIcon from '../../assets/settings.svg?react';
import ArrowRightIcon from '../../assets/arrow_right.svg?react';
import { useNavigate } from 'react-router-dom';

export function ProfileSettings() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/');
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 flex items-center gap-2'>
        <img className='' src='odin.png' alt='' width={40} height={40} />
        <h2 className='text-gray-50 font-semibold ml-2'>ODIN</h2>
      </div>
      <section className='p-4'>
        <h3 className='flex items-center gap-2 text-gray-25'>
          <UserIcon height={16} width={16} className='fill-gray-25' />
          Meu usuário
        </h3>
        <hr />
        <ul className='text-sm font-normal text-gray-25'>
          <li className='flex'>
            Nome <strong className='font-medium ml-auto'>João da Silva</strong>
          </li>
          <li className='flex'>
            E-mail
            <strong className='font-medium ml-auto'>(42)99999-9999</strong>
          </li>
          <li className='flex'>
            Contato
            <strong className='font-medium ml-auto'>
              joaodasilva@gmail.com
            </strong>
          </li>
        </ul>
      </section>
      <section className='p-4'>
        <h3 className='flex items-center gap-2 text-gray-25'>
          <SettingIcon height={16} width={16} className='fill-gray-25' />
          Configurações
        </h3>
        <hr />
        <div>
          <button
            type='button'
            className='w-full flex justify-between text-gray-25'
          >
            Atendimento
            <ArrowRightIcon height={16} className='fill-orange-400' />
          </button>
          <button
            type='button'
            className='w-full flex justify-between text-gray-25'
          >
            Meus Profissionais
            <ArrowRightIcon height={16} className='fill-orange-400 ' />
          </button>
        </div>
      </section>
      <div className='flex flex-1'>
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
