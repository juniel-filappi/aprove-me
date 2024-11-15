import { IsArray, IsNotEmpty } from "class-validator";
import { CreatePayableDto } from "@/shared/dto/payable/create-payable.dto";

export class BatchPayableDto {
    @IsNotEmpty()
    @IsArray()
    payables: CreatePayableDto[]
}