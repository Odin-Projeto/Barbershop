import { FormProvider, useForm } from 'react-hook-form';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import ArrowRight from '../../assets/arrow_right.svg?react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export function Search() {
  const searchForm = useForm({ defaultValues: { search: '' } });
  const navigate = useNavigate();
  const { handleSubmit } = searchForm;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch() {}

  function handleReturnPreviousPage() {
    return navigate('/home');
  }

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  return (
    <FormProvider {...searchForm}>
      <div className='h-full flex flex-col'>
        <div className='flex p-4 items-center fixed bg-gray-800 w-full z-10'>
          <form onSubmit={handleSubmit(handleSearch)} className='flex gap-4'>
            <button
              className='fill-gray-50 rounded-full bg-gray-500 p-1'
              onClick={handleReturnPreviousPage}
            >
              <ArrowLeft height={24} />
            </button>
            <input
              ref={inputRef}
              className='bg-transparent outline-none caret-orange-400 text-gray-25'
              placeholder='Pesquisar'
              type='text'
            />
          </form>
        </div>
        <section className='flex p-4 mt-16'>
          <ul className='flex-1'>
            <li className=''>
              <span className='text-gray-100 text-sm'>
                qui, 11 de abr de 2024
              </span>
              <button className='mt-2 bg-gray-600 rounded-xl w-full p-4 hover:bg-slate-700 hover:pr-5 ease-in duration-300'>
                <div className='flex flex-col text-gray-25'>
                  <div className='flex gap-4 items-center'>
                    <span className=''>11:45</span>
                    <div className='w-[3px] h-4 bg-green-400 rounded'></div>
                    <span>Felipe Rodrigo</span>
                    <ArrowRight className='h-3 ml-auto fill-orange-400' />
                  </div>
                </div>
                <div className='pl-18 text-sm text-gray-25 text-left'>
                  Nome do serviço realizado
                </div>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </FormProvider>
  );
}
