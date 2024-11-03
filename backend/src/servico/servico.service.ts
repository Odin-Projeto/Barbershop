import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateServicoDto,
  FetchServicoDto,
  UpdateServicoDto,
} from './servico.dto';
import { Servico } from '@prisma/client';

@Injectable()
export class ServicoService {
  constructor(private prisma: PrismaService) {}

  async createServico(servico: CreateServicoDto): Promise<Servico> {
    const createdServico = await this.prisma.servico.create({
      data: servico,
    });

    return createdServico;
  }

  async updateServico(
    id: string,
    { descricao, duracao, nome, porcentagem_comissao, valor }: UpdateServicoDto,
  ) {
    const updatedServico = await this.prisma.servico.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(descricao && { descricao }),
        ...(duracao && { duracao: Number(duracao) }),
        ...(nome && { nome }),
        ...(porcentagem_comissao && {
          porcentagem_comissao: Number(porcentagem_comissao),
        }),
        ...(valor && { valor }),
      },
    });

    return updatedServico;
  }

  async fetchServico({
    descricao,
    duracao,
    id,
    nome,
    porcentagem_comissao,
    valor,
  }: FetchServicoDto) {
    return this.prisma.servico.findMany({
      where: {
        ...(Number(id) && { id: Number(id) }),
        ...(nome && { nome }),
        ...(descricao && {
          descricao,
        }),
        ...(porcentagem_comissao && {
          porcentagem_comissao: Number(porcentagem_comissao),
        }),
        ...(duracao && {
          duracao: Number(duracao),
        }),
        ...(valor && { valor: Number(valor) }),
      },
    });
  }
}
