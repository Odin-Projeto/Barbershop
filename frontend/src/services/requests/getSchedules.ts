import { api } from '../../utils';

export async function getSchedules() {
  const { data } = await api.get('/agendamento');
  return data;
}
