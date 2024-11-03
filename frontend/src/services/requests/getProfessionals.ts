import { api } from '../../utils';

export async function getProfessionals() {
  const { data } = await api.get('/profissional');
  return data;
}
