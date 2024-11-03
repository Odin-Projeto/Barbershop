import { OmitType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export enum AgendamentoStatus {
  MARCADO = 'MARCADO',
  CONFIRMADO = 'CONFIRMADO',
  REALIZADO = 'REALIZADO',
  CANCELADO = 'CANCELADO',
}

export class AgendamentoDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsEnum(AgendamentoStatus)
  @IsOptional()
  status: AgendamentoStatus;

  @IsDateString()
  @IsOptional()
  dataHora: Date;

  @IsNumber()
  @IsOptional()
  valor: number;

  @IsNumber()
  @IsOptional()
  comissao_profissional: number;

  @IsNumber()
  @IsOptional()
  profissional_id: number;

  @IsNumber()
  @IsOptional()
  servico_id: number;
}

export class CreateAgendamentoDto extends OmitType(AgendamentoDto, [
  'id',
] as const) {}

export class UpdateAgendamentoDto extends OmitType(AgendamentoDto, [
  'id',
] as const) {}

export class FetchAgendamentoDto extends OmitType(AgendamentoDto, [
  'id',
  'valor',
] as const) {
  @IsNumberString()
  @IsOptional()
  id: string;

  @IsNumberString()
  @IsOptional()
  valor: number;
}
