import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAgendamentoDto,
  FetchAgendamentoDto,
  UpdateAgendamentoDto,
} from './agendamento.dto';
import { Agendamento } from '@prisma/client';

@Injectable()
export class AgendamentoService {
  constructor(private prisma: PrismaService) {}

  async createAgendamento(
    agendamento: CreateAgendamentoDto,
  ): Promise<Agendamento> {
    const dataHora = new Date(agendamento.dataHora);
    delete agendamento.dataHora;
    const createdProfisional = await this.prisma.agendamento.create({
      data: { ...agendamento, dataHora: dataHora },
    });

    return createdProfisional;
  }

  async updateAgendamento(
    id: string,
    {
      comissao_profissional,
      dataHora,
      profissional_id,
      status,
      valor,
      servico_id,
    }: UpdateAgendamentoDto,
  ) {
    const updatedAgendamento = await this.prisma.agendamento.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(status && { status }),
        ...(dataHora && { dataHora }),
        ...(valor && { valor }),
        ...(comissao_profissional && { comissao_profissional }),
        ...(profissional_id && { profissional_id }),
        ...(servico_id && { servico_id }),
      },
    });

    return updatedAgendamento;
  }

  async fetchAgendamento({
    comissao_profissional,
    dataHora,
    profissional_id,
    status,
    valor,
    servico_id,
    id,
  }: FetchAgendamentoDto) {
    return this.prisma.agendamento.findMany({
      where: {
        ...(Number(id) && { id: Number(id) }),
        ...(comissao_profissional && {
          comissao_profissional: Number(comissao_profissional),
        }),
        ...(dataHora && { dataHora: new Date(dataHora) }),
        ...(profissional_id && { profissional_id: Number(profissional_id) }),
        ...(servico_id && { servico_id: Number(servico_id) }),
        ...(status && { status: { contains: status } }),
        ...(valor && { valor: Number(valor) }),
      },
      include: { Profissional: true, Servico: true },
    });
  }
}
