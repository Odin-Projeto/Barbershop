import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const matchingRoute = {
  home: '/home',
  scheduleDetails: '/schedule-details',
};

export function useMenu() {
  const { pathname } = useLocation();
  const isVisible = useMemo(
    () => Object.values(matchingRoute).some((route) => route === pathname),
    [pathname, matchingRoute]
  );

  return {
    isVisible,
  };
}
