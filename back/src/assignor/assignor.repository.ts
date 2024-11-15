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
        const dataCreate: CreateAssignorDto = {
            document: data.document,
            email: data.email,
            phone: data.phone,
            name: data.name
        }

        if (data.id) {
            dataCreate.id = data.id
        }

        return this.prisma.assignor.create({data: dataCreate})
    }

    async update(id: string, data: UpdateAssignorDto) {
        const dataUpdate = {
            document: data.document,
            email: data.email,
            phone: data.phone,
            name: data.name
        }

        return this.prisma.assignor.update({where: {id}, data: dataUpdate})
    }

    async delete(id: string) {
        return this.prisma.assignor.delete({where: {id}})
    }
}