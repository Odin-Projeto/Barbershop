import { api } from '../../utils';
import { Professional } from './getProfessionalById';

export async function getProfessionals(): Promise<Professional[]> {
  const { data } = await api.get('/profissional');
  return data;
}
