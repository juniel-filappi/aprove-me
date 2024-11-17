import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAssignorDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  document?: string;

  @IsOptional()
  @IsEmail()
  @Length(6, 140)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(3, 140)
  name?: string;
}
