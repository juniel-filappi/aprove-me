import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreatePayableDto } from "../shared/dto/payable/create-payable.dto";

@Injectable()
export class PayableRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePayableDto) {
        return this.prisma.payable.create({ data })
    }
}