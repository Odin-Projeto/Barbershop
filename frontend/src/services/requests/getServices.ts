import { api } from '../../utils';

export type Service = {
  id: number;
  nome: string;
  descricao: string;
  duracao: number;
  valor: number;
  porcentagem_comissao: number;
};

export async function getServices(): Promise<Service[]> {
  const { data } = await api.get('/servico');
  return data;
}
