import { api } from '../../utils';
import { Schedule } from './getScheduleById';

export async function getSchedules(): Promise<Schedule[]> {
  const { data } = await api.get('/agendamento');
  return data;
}
