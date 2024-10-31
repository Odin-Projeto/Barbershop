import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateAgendamentoDto,
  FetchAgendamentoDto,
  UpdateAgendamentoDto,
} from './agendamento.dto';
import { AgendamentoService } from './agendamento.service';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private agendamentoService: AgendamentoService) {}

  @Post()
  async createAgendamento(@Body() agendamento: CreateAgendamentoDto) {
    const createdProfisional =
      await this.agendamentoService.createAgendamento(agendamento);

    return createdProfisional;
  }

  @Put(':id')
  async updateAgendamento(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateAgendamentoDto,
  ) {
    const updatedAgendamento = this.agendamentoService.updateAgendamento(
      id,
      dataToUpdate,
    );

    return updatedAgendamento;
  }

  @Get()
  async fetchAgendamento(@Query() filter: FetchAgendamentoDto) {
    const fetchedAgendamento =
      await this.agendamentoService.fetchAgendamento(filter);

    return fetchedAgendamento;
  }
}
