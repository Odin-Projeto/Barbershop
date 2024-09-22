import {
  ClassNames,
  Day,
  DayButton,
  DayPicker,
  FormatOptions,
  getDefaultClassNames,
} from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { format, getDate } from 'date-fns';
import SearchIcon from '../../assets/search.svg?react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../../assets/arrow_right.svg?react';
import { useScheduleStore } from './store';
import { useProfessionalStore, useServiceStore } from '../settings/store';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

const formatWeekdayName = (date: Date) => {
  return format(date, 'EEEEE', { locale: ptBR });
};
const formatMonthCaption = (date: Date, options?: FormatOptions) => {
  const m = format(date, 'LLL', options);
  return `${m}`;
};

export function ScheduleHome() {
  const defaultClassNames = getDefaultClassNames();
  const navigate = useNavigate();
  const professionals = useProfessionalStore((state) => state.professionals);
  const services = useServiceStore((state) => state.services);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const schedules = useScheduleStore((state) => state.schedules);
  const filteredSchedules = schedules.filter(
    (schedule) => getDate(schedule.date) === getDate(selectedDate)
  );
  const schedulesByDate = useCallback((date: Date) => {
    return schedules.filter(
      (schedule) => getDate(schedule.date) === getDate(date)
    );
  }, []);

  const classNames: Partial<ClassNames> = {
    today: `group text-orange-400`,
    nav: `absolute flex justify-between w-full`,
    months: `relative`,
    month: 'flex flex-col',
    month_caption: `text-lg font-bold`,
    weeks: `w-full text-sm`,
    week: `h-14`,
    month_grid: 'border-separate border-spacing-2',
    day: 'text-center p-1 text-center py-[2px] px-1 align-top relative',
    day_button: `group-data-[today=true]:bg-orange-400 group-data-[today=true]:font-bold w-min text-gray-25 py-[2px] px-1 rounded-xs`,
    caption_label: `flex justify-center uppercase`,
    selected: `border border-gray-500 rounded-xxs`,
    root: `${defaultClassNames.root} text-gray-50 mt-20`,
    chevron: `${defaultClassNames.chevron} fill-amber-500`,
  };

  function handleShowSchedule(id?: string | null) {
    navigate('/confirm-schedule', { state: { id } });
  }

  function handleSelectDate(date?: Date) {
    if (!date) return;
    setSelectedDate(date);
  }

  return (
    <div className='h-full flex flex-col'>
      <div className='flex p-4 items-center fixed bg-gray-800 w-full z-10 left-0'>
        <img className='' src='odin.png' alt='' width={40} height={40} />
        <h2 className='text-gray-50 font-semibold ml-2'>ODIN</h2>
        <div className='ml-auto flex items-center gap-4'>
          {!!filteredSchedules.length && (
            <button className='rounded-xs border p-1 h-8 w-8 text-md font-bold border-orange-400 text-gray-50'>
              {filteredSchedules.length}
            </button>
          )}

          <button
            className='fill-gray-50 rounded-full bg-gray-500 p-1'
            onClick={() => {
              navigate('/search-schedules');
            }}
          >
            <SearchIcon height={24} />
          </button>
        </div>
      </div>
      <DayPicker
        mode='single'
        classNames={classNames}
        locale={ptBR}
        formatters={{
          formatMonthCaption,
          formatWeekdayName,
        }}
        onSelect={handleSelectDate}
        components={{
          Day: (e) => <Day {...e}></Day>,
          DayButton: (e) => {
            console.log('sdfsdf', e.children);
            return (
              <DayButton {...e}>
                {e.children}
                <div className='absolute flex flex-col w-full gap-[2px] left-0 p-1'>
                  {schedulesByDate(e.day.date).map((schedule, index) => {
                    if (index < 4) {
                      return (
                        <span
                          key={index}
                          className={[
                            'h-[3px] rounded-lg w-full',
                            schedule.confirmed
                              ? 'bg-green-500'
                              : 'bg-yellow-400',
                          ].join(' ')}
                        ></span>
                      );
                    }
                  })}
                </div>
              </DayButton>
            );
          },
        }}
      />
      <hr className='border-gray-25' />
      <div className='pb-18'>
        <div className='text-gray-100 text-sm px-4 mt-4'>
          {format(selectedDate, "eee, dd 'de' MMM 'de' yyyy", {
            locale: ptBR,
          })}
        </div>

        <ul className='flex-1'>
          {filteredSchedules.map((schedule, index) => (
            <li
              key={index}
              className='last:border-none border-b mx-4 border-b-gray-200'
            >
              <button
                className='rounded-xl w-full py-4 hover:pr-5 ease-in duration-300'
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
      </div>
    </div>
  );
}
