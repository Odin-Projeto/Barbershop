import AddIcon from '../../assets/plus.svg?react';
import HomeIcon from '../../assets/home.svg?react';
import MenuIcon from '../../assets/menu.svg?react';
import { useMenu } from './hooks/useMenu';
import { NavLink } from 'react-router-dom';
import { useScheduleStore } from '../../pages/schedule/store';

export function NavMenu() {
  const { isVisible, isVisibleCenterButton } = useMenu();
  const resetCurrentSchedule = useScheduleStore(
    (state) => state.resetCurrentSchedule
  );

  if (!isVisible) return;

  return (
    <div className='bg-gray-600 h-14 fixed bottom-0 w-full left-0'>
      <nav className='w-full flex justify-evenly'>
        <NavLink
          to={'/home'}
          className={({ isActive }) =>
            [
              'text-xs text-gray-400 fill-gray-400',
              isActive ? 'text-orange-400 fill-orange-400' : undefined,
            ].join(' ')
          }
        >
          <HomeIcon className='h-8' />
          Home
        </NavLink>
        <div
          className={[
            'bg-gray-800 h-fit p-2 flex rounded-full -mt-10',
            !isVisibleCenterButton ? 'invisible' : undefined,
          ].join(' ')}
        >
          <NavLink
            to={'new-schedule'}
            state={{ reset: true }}
            onClick={resetCurrentSchedule}
            className='bg-orange-400 rounded-full flex items-center justify-center h-14 w-14 shadow-sm shadow-orange-200/50 fill-slate-800'
          >
            <AddIcon height={24} />
          </NavLink>
        </div>
        <NavLink
          to={'/settings'}
          className={({ isActive }) =>
            [
              'text-xs text-gray-400 fill-gray-400',
              isActive ? 'text-orange-400 fill-orange-400' : undefined,
            ].join(' ')
          }
        >
          <MenuIcon className='h-8' />
          Menu
        </NavLink>
      </nav>
    </div>
  );
}
