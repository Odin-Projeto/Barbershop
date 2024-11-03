import { getHours, getMinutes } from 'date-fns';

export function formatTime(date: Date): string {
  const hours = getHours(date); // 15
  const minutes = getMinutes(date); // 45

  return `${hours}:${minutes}`;
}
