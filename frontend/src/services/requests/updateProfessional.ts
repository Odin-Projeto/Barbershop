import { api } from '../../utils';

export async function updateProfessional(data: any) {
  const { id, ...rest } = data;
  const result = await api.put(`/profissional/${id}`, rest);
  return result;
}
