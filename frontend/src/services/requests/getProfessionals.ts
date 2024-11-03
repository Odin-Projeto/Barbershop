import { api } from '../../utils';

export type Professional = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  admin: boolean;
};

export async function getProfessionals(): Promise<Professional[]> {
  const { data } = await api.get('/profissional');
  return data;
}
