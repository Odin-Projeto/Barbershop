import { api } from '../../utils';

export async function cancelSchedule(id: number) {
  const result = await api.put(`/agendamento/${id}`, { status: 'CANCELADO' });
  return result;
}
