import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProfisisonalDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  senha: string;

  @IsString()
  @IsOptional()
  telefone: string;

  @IsBoolean()
  @IsOptional()
  admin: boolean;
}

export class CreateProfissionalDto extends OmitType(ProfisisonalDto, [
  'id',
] as const) {}

export class UpdateProfissionalDto extends OmitType(ProfisisonalDto, [
  'id',
] as const) {}

export class FetchProfissionalDto extends OmitType(ProfisisonalDto, [
  'id',
] as const) {
  @IsNumberString()
  @IsOptional()
  id: string;
}
