import { api } from '../../utils';
import { Professional } from './getProfessionals';
import { Service } from './getServices';

export type Schedule = {
  id: number;
  status: string;
  dataHora: Date;
  valor: number;
  comissao_profissional: number;
  profissional_id: number;
  servico_id: number;
  Profissional: Professional;
  Servico: Service;
};

export async function getScheduleById(id: number): Promise<Schedule> {
  const { data } = await api.get('/agendamento', { params: { id } });
  return data[0];
}
