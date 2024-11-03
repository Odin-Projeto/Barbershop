import { api } from '../../utils';

export async function getServices() {
  const { data } = await api.get('/servico');
  return data;
}
