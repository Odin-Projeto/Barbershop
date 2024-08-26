import {
  ClassNames,
  DayPicker,
  FormatOptions,
  getDefaultClassNames,
} from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import SearchIcon from '../../assets/search.svg?react';
import { useNavigate } from 'react-router-dom';

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
  const classNames: Partial<ClassNames> = {
    today: `group text-orange-400`,
    nav: `absolute flex justify-between w-full`,
    months: `relative`,
    month: 'flex flex-col',
    month_caption: `text-lg font-bold`,
    weeks: `w-full text-sm`,
    week: `h-14`,
    month_grid: 'border-separate border-spacing-2',
    day: 'text-center p-1 text-center py-[2px] px-1 align-top',
    day_button: `group-data-[today=true]:bg-orange-400 group-data-[today=true]:font-bold w-min text-gray-25 py-[2px] px-1 rounded-xs`,
    caption_label: `flex justify-center uppercase`,
    selected: `border border-gray-500 rounded-xxs`,
    root: `${defaultClassNames.root} shadow-lg text-gray-50 mt-20`,
    chevron: `${defaultClassNames.chevron} fill-amber-500`,
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='flex p-4 items-center fixed bg-gray-800 w-full z-10 left-0'>
        <img className='' src='odin.png' alt='' width={40} height={40} />
        <h2 className='text-gray-50 font-semibold ml-2'>ODIN</h2>
        <div className='ml-auto flex items-center gap-4'>
          <button className='rounded-xs border p-1 h-8 w-8 text-md font-bold border-orange-400 text-gray-50'>
            11
          </button>
          <button
            className='fill-gray-50 rounded-full bg-gray-500 p-1'
            onClick={() => {
              console.log('console');
              navigate('/schedule-search');
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
      />
      <hr />
    </div>
  );
}
