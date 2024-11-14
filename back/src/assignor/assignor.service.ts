import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AssignorRepository } from "./assignor.repository";
import { CreateAssignorDto } from "@/shared/dto/assignor/create-assignor.dto";
import { Assignor } from "@prisma/client";
import { UpdateAssignorDto } from "@/shared/dto/assignor/update-assignor.dto";

@Injectable()
export class AssignorService {
    constructor(private readonly repository: AssignorRepository) {
    }

    async getAll(): Promise<Assignor[]> {
        return this.repository.getAll()
    }

    async getAssignor(id: string): Promise<Assignor> {
        const assignor = await this.repository.findById(id)

        if (!assignor) {
            throw new NotFoundException('Assignor not found')
        }

        return assignor
    }

    async create(data: CreateAssignorDto): Promise<Assignor> {
        const assignor = await this.repository.findByDocument(data.document)

        if (assignor) {
            throw new ConflictException('Assignor already exists')
        }

        return this.repository.create(data)
    }

    async update(id: string, data: UpdateAssignorDto): Promise<Assignor> {
        const assignor = await this.repository.findById(id)

        if (!assignor) {
            throw new NotFoundException('Assignor not found')
        }

        return this.repository.update(id, data)
    }

    async delete(id: string): Promise<void> {
        const assignor = await this.repository.findById(id)

        if (!assignor) {
            throw new NotFoundException('Assignor not found')
        }

        await this.repository.delete(id)
    }
}
