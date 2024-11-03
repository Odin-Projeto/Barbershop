import { OmitType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ServicoDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsOptional()
  descricao: string;

  @IsNumber()
  @IsOptional()
  duracao: number;

  @IsNumber()
  @IsOptional()
  valor: number;

  @IsNumber()
  @IsOptional()
  porcentagem_comissao: number;
}

export class CreateServicoDto extends OmitType(ServicoDto, ['id'] as const) {}

export class UpdateServicoDto extends OmitType(ServicoDto, ['id'] as const) {}

export class FetchServicoDto extends OmitType(ServicoDto, ['id'] as const) {
  @IsNumberString()
  @IsOptional()
  id: string;
}
