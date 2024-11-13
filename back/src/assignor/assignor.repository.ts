import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateAssignorDto } from "../shared/dto/assignor/create-assignor.dto";

@Injectable()
export class AssignorRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return this.prisma.assignor.findUnique({ where: { id } })
    }

    async create(data: CreateAssignorDto) {
        return this.prisma.assignor.create({ data })
    }
}