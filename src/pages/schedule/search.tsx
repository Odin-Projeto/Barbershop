import { FormProvider, useForm, useWatch } from 'react-hook-form';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import ArrowRight from '../../assets/arrow_right.svg?react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { useScheduleStore } from './store';
import { useProfessionalStore, useServiceStore } from '../settings/store';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type SearchForm = {
  search: string;
};

export function Search() {
  const searchForm = useForm<SearchForm>({ defaultValues: { search: '' } });
  const schedules = useScheduleStore((state) => state.schedules);
  const professionals = useProfessionalStore((state) => state.professionals);
  const services = useServiceStore((state) => state.services);
  const navigate = useNavigate();
  const { handleSubmit, register, control } = searchForm;
  const { ref, ...rest } = register('search');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchValue = useWatch({ control, name: 'search' });

  const filteredSchedules = useMemo(() => {
    if (!searchValue) return schedules;
    const serviceFound = services.find(
      (service) =>
        service.name.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
    );

    if (serviceFound) {
      return schedules.filter(
        (schedule) => schedule.idService === serviceFound.id
      );
    }
    return [];
  }, [searchValue]);

  function handleReturnPreviousPage() {
    return navigate('/home');
  }

  function handleShowSchedule(id?: string | null) {
    navigate('/confirm-schedule', { state: { id } });
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
          <form onSubmit={handleSubmit(() => {})} className='flex gap-4'>
            <button
              type='button'
              className='fill-gray-50 rounded-full bg-gray-500 p-1'
              onClick={handleReturnPreviousPage}
            >
              <ArrowLeft height={24} />
            </button>
            <input
              {...rest}
              ref={(e) => {
                inputRef.current = e;
                ref(e);
              }}
              className='bg-transparent outline-none caret-orange-400 text-gray-25'
              placeholder='Pesquisar'
              type='text'
            />
          </form>
        </div>
        <section className='flex p-4 mt-16'>
          <ul className='flex-1'>
            {filteredSchedules.map((schedule, index) => (
              <li key={index} className=''>
                <span className='text-gray-100 text-sm'>
                  {format(schedule.date, "eee, dd 'de' MMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>

                <button
                  className='mt-2 bg-gray-600 rounded-xl w-full p-4 hover:bg-slate-700 hover:pr-5 ease-in duration-300'
                  onClick={() => handleShowSchedule(schedule.id)}
                >
                  <div className='flex flex-col text-gray-25'>
                    <div className='flex gap-4 items-center'>
                      <span className=''>{schedule.time}</span>
                      <div
                        className={[
                          'w-[3px] h-4 rounded',
                          schedule.confirmed ? 'bg-green-400' : 'bg-yellow-400',
                        ].join(' ')}
                      ></div>
                      <span>Guilherme da Silva</span>
                      <ArrowRight className='h-3 ml-auto fill-orange-400' />
                    </div>
                  </div>
                  <div className='pl-18 text-sm text-gray-25 text-left'>
                    {
                      services.find(
                        (service) => service.id === schedule.idService
                      )?.name
                    }
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </FormProvider>
  );
}
