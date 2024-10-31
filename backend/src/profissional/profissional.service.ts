import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProfissionalDto,
  FetchProfissionalDto,
  UpdateProfissionalDto,
} from './profissional.dto';
import { Profissional } from '@prisma/client';

@Injectable()
export class ProfissionalService {
  constructor(private prisma: PrismaService) {}

  async createProfissional(
    profissional: CreateProfissionalDto,
  ): Promise<Profissional> {
    const createdProfisional = await this.prisma.profissional.create({
      data: profissional,
    });

    return createdProfisional;
  }

  async updateProfissional(
    id: string,
    { admin, email, nome, senha, telefone }: UpdateProfissionalDto,
  ) {
    const updatedProfissional = await this.prisma.profissional.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(admin && { admin }),
        ...(email && { email }),
        ...(nome && { nome }),
        ...(senha && { senha }),
        ...(telefone && { telefone }),
      },
    });

    return updatedProfissional;
  }

  async fetchProfissional({
    admin,
    email,
    id,
    nome,
    telefone,
  }: FetchProfissionalDto) {
    return this.prisma.profissional.findMany({
      where: {
        ...(Number(id) && { id: Number(id) }),
        ...(admin && { admin }),
        ...(email && { email: { contains: email } }),
        ...(nome && { nome: { contains: nome } }),
        ...(telefone && { telefone: { contains: telefone } }),
      },
    });
  }
}
