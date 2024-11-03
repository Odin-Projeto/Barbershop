import { api } from '../../utils';

export async function confirmSchedule(id: number) {
  const result = await api.put(`/agendamento/${id}`, { status: 'CONFIRMADO' });
  return result;
}
