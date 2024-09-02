import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const matchingRoute = {
  home: '/home',
  scheduleDetails: '/schedule-details',
  newSchedule: '/new-schedule',
  confirmSchedule: '/confirm-schedule',
  confirmedSchedule: '/confirmed-schedule',
};

export function useMenu() {
  const { pathname } = useLocation();
  const isVisible = useMemo(
    () => Object.values(matchingRoute).some((route) => route === pathname),
    [pathname, matchingRoute]
  );
  const isVisibleCenterButton = pathname === matchingRoute.home;

  return {
    isVisible,
    isVisibleCenterButton,
  };
}
