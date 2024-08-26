import { FormProvider, useForm } from 'react-hook-form';
import ArrowLeft from '../../assets/arrow_left.svg?react';

export function Search() {
  const searchForm = useForm({ defaultValues: { search: '' } });
  const { handleSubmit } = searchForm;

  function handleSearch() {}

  return (
    <FormProvider {...searchForm}>
      <div className='h-full flex flex-col'>
        <div className='flex p-4 items-center fixed bg-gray-800 w-full z-10'>
          <form onSubmit={handleSubmit(handleSearch)}>
            <button
              className='fill-gray-50 rounded-full bg-gray-500 p-1'
              onClick={() => {}}
            >
              <ArrowLeft height={24} />
            </button>
            <input className='bg-transparent outline-none' type='text' />
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
