import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProfissionalModule } from './profissional/profissional.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { ServicoModule } from './servico/servico.module';

@Module({
  imports: [PrismaModule, ProfissionalModule, AgendamentoModule, ServicoModule],
  providers: [PrismaModule],
})
export class AppModule {}
