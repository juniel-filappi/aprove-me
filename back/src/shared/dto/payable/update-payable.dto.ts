import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePayableDto {
    @IsOptional()
    @IsNumber()
    value?: number

    @IsOptional()
    @IsDateString({})
    emissionDate?: Date

    @IsOptional()
    @IsString()
    assignorId?: string
}