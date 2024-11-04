import { api } from '../../utils';

export async function createProfessional(data: any) {
  const result = await api.post('/profissional', data);
  return result;
}
