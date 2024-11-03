import { api } from '../../utils';

export async function getScheduleById(id: number) {
  const { data } = await api.get('/agendamento', { params: { id } });
  return data[0];
}
