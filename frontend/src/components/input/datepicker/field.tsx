import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MouseEvent, useEffect, useId, useRef, useState } from 'react';
import {
  ClassNames,
  DayPicker,
  DayPickerProps,
  FormatOptions,
  getDefaultClassNames,
} from 'react-day-picker';
import { useController, useFormContext } from 'react-hook-form';
import Calendar from '../../../assets/calendar.svg?react';

type FieldProps = DayPickerProps & {
  name: string;
};

export function Field({ name, ...props }: FieldProps) {
  const { control, setValue } = useFormContext();
  const defaultClassNames = getDefaultClassNames();
  const {
    field: { ...fieldProps },
  } = useController({ control, name, defaultValue: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const dialogId = useId();
  const headerId = useId();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const classNames: Partial<ClassNames> = {
    today: `group text-orange-400`,
    nav: `absolute flex justify-between w-full`,
    months: `relative`,
    month: 'flex flex-col',
    month_caption: `text-lg font-bold`,
    weeks: `w-full text-sm`,
    month_grid: 'border-separate border-spacing-2',
    day: 'text-center p-0 h-10 w-10 text-center align-top hover:cursor-pointer hover:border bg-transparent',
    day_button: `group-data-[today=true]:bg-orange-400 group-data-[today=true]:font-bold w-min text-gray-25 py-[2px] px-1 rounded-xs`,
    caption_label: `flex justify-center uppercase`,
    selected: `border border-gray-500 rounded-xxs`,
    // root: `${defaultClassNames.root} mt-20`,
    chevron: `${defaultClassNames.chevron} fill-amber-500`,
  };

  function formatWeekdayName(date: Date) {
    return format(date, 'EEEEE', { locale: ptBR });
  }

  function formatMonthCaption(date: Date, options?: FormatOptions) {
    const m = format(date, 'LLL', options);
    return `${m}`;
  }

  function toggleDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  function handleClickOutside(event: MouseEvent) {
    const dialogElement = dialogRef.current;
    if (dialogElement && event.target === dialogElement) {
      setIsDialogOpen(false);
    }
  }

  function handleSelectDate(date?: Date) {
    if (!date) {
      dialogRef.current?.close();
      return;
    }

    setSelectedDate(date);
    setValue(name, format(date, 'dd/MM/yyyy'));
    dialogRef.current?.close();
  }

  function normalizeDate(value: string) {
    value = value.replace(/\D/g, '');

    if (value.length >= 2) {
      let day = parseInt(value.substring(0, 2), 10);
      if (day > 31) {
        day = 31;
      }
      value = day.toString().padStart(2, '0') + value.substring(2);
    }

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2');
    }

    if (value.length >= 5) {
      let month = parseInt(value.substring(3, 5), 10);
      if (month > 12) {
        month = 12;
      }
      value =
        value.substring(0, 3) +
        month.toString().padStart(2, '0') +
        value.substring(5);
    }

    if (value.length > 5) {
      value = value.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    return value.slice(0, 10);
  }

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }

    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  return (
    <div className='relative'>
      <input
        {...fieldProps}
        onChange={(e) => {
          e.target.value = normalizeDate(e.target.value);
          fieldProps.onChange(e);
        }}
        type='text'
        inputMode='numeric'
        placeholder='DD/MM/AAAA'
        className='text-sm bg-gray-500 rounded-xl text-gray-300 border border-gray-600 h-10 w-full p-4 disabled:opacity-80'
      />
      <button
        type='button'
        onClick={toggleDialog}
        className='absolute right-0 mr-4 h-full'
      >
        <Calendar className='h-5 fill-gray-300' />
      </button>
      <dialog
        role='dialog'
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        className='bg-transparent backdrop:bg-black backdrop:bg-opacity-25'
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onClick={handleClickOutside}
      >
        <DayPicker
          {...props}
          className={['bg-gray-800 text-gray-25 p-6 rounded'].join(' ')}
          classNames={classNames}
          mode='single'
          locale={ptBR}
          formatters={{
            formatMonthCaption,
            formatWeekdayName,
          }}
          selected={selectedDate}
          onSelect={handleSelectDate}
        />
      </dialog>
    </div>
  );
}
