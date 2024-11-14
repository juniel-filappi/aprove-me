import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateAssignorDto } from "@/shared/dto/assignor/create-assignor.dto";
import { UpdateAssignorDto } from "@/shared/dto/assignor/update-assignor.dto";

@Injectable()
export class AssignorRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async getAll() {
        return this.prisma.assignor.findMany()
    }

    async findByDocument(document: string) {
        return this.prisma.assignor.findFirst({where: {document}})
    }

    async findById(id: string) {
        return this.prisma.assignor.findFirst({where: {id}})
    }

    async create(data: CreateAssignorDto) {
        return this.prisma.assignor.create({data})
    }

    async update(id: string, data: UpdateAssignorDto) {
        return this.prisma.assignor.update({where: {id}, data})
    }

    async delete(id: string) {
        return this.prisma.assignor.delete({where: {id}})
    }
}