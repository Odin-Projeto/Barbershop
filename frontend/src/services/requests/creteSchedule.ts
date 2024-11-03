import { api } from '../../utils';

export async function createSchdule(payload: any) {
  const result = await api.post('agendamento', payload);
  return result;
}
