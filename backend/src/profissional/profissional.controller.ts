import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateProfissionalDto,
  FetchProfissionalDto,
  UpdateProfissionalDto,
} from './profissional.dto';
import { ProfissionalService } from './profissional.service';

@Controller('profissional')
export class ProfissionalController {
  constructor(private profissionalService: ProfissionalService) {}

  @Post()
  async createProfissional(@Body() profissional: CreateProfissionalDto) {
    const createdProfisional =
      await this.profissionalService.createProfissional(profissional);

    return createdProfisional;
  }

  @Put(':id')
  async updateProfissional(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateProfissionalDto,
  ) {
    const updatedProfissional = this.profissionalService.updateProfissional(
      id,
      dataToUpdate,
    );

    return updatedProfissional;
  }

  @Get()
  async fetchProfissional(@Query() filter: FetchProfissionalDto) {
    const fetchedProfissional =
      await this.profissionalService.fetchProfissional(filter);

    return fetchedProfissional;
  }
}
