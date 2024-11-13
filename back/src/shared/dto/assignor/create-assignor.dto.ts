import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateAssignorDto {
    @IsUUID('4')
    @IsOptional()
    id?: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    document: string

    @IsDateString({})
    @IsNotEmpty()
    @Length(6, 140)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    phone: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 140)
    name: string
}