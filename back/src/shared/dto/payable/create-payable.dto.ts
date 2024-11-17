import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePayableDto {
  @IsUUID('4')
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString({})
  @IsNotEmpty()
  emissionDate: Date;

  @IsString()
  @IsNotEmpty()
  assignorId: string;
}
