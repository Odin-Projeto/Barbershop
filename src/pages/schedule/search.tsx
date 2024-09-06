import { FormProvider, useForm } from 'react-hook-form';
import ArrowLeft from '../../assets/arrow_left.svg?react';
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
              <button className='bg-gray-600 rounded-xl w-full p-4'>
                <span>11:35</span>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </FormProvider>
  );
}
