import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProfissionalModule } from './profissional/profissional.module';
import { AgendamentoModule } from './agendamento/agendamento.module';

@Module({
  imports: [PrismaModule, ProfissionalModule, AgendamentoModule],
  providers: [PrismaModule],
})
export class AppModule {}
