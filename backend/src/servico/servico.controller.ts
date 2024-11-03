import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateServicoDto,
  FetchServicoDto,
  UpdateServicoDto,
} from './servico.dto';
import { ServicoService } from './servico.service';

@Controller('servico')
export class ServicoController {
  constructor(private servicoService: ServicoService) {}

  @Post()
  async createServico(@Body() profissional: CreateServicoDto) {
    const createdServico =
      await this.servicoService.createServico(profissional);

    return createdServico;
  }

  @Put(':id')
  async updateServico(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateServicoDto,
  ) {
    const updatedServico = this.servicoService.updateServico(id, dataToUpdate);

    return updatedServico;
  }

  @Get()
  async fetchServico(@Query() filter: FetchServicoDto) {
    console.log('ooiiiii');
    const fetchedServico = await this.servicoService.fetchServico(filter);

    return fetchedServico;
  }
}
