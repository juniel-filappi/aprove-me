import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreatePayableDto } from "@/shared/dto/payable/create-payable.dto";
import { UpdatePayableDto } from "@/shared/dto/payable/update-payable.dto";

@Injectable()
export class PayableRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return this.prisma.payable.findUnique({ where: { id } })
    }

    async getAll() {
        return this.prisma.payable.findMany()
    }

    async create(data: CreatePayableDto) {
        return this.prisma.payable.create({ data })
    }

    async update(id: string, data: UpdatePayableDto) {
        return this.prisma.payable.update({ where: { id }, data })
    }

    async delete(id: string) {
        return this.prisma.payable.delete({ where: { id } })
    }
}