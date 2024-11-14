import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from "@/shared/dto/payable/create-payable.dto";
import { PayableRepository } from "./payable.repository";
import { AssignorRepository } from "@/assignor/assignor.repository";
import { UpdatePayableDto } from "@/shared/dto/payable/update-payable.dto";

@Injectable()
export class PayableService {
    constructor(
        private readonly payableRepository: PayableRepository,
        private readonly assignorRepository: AssignorRepository,
    ) {
    }

    async getAll() {
        return this.payableRepository.getAll()
    }

    async getById(id: string) {
        const payable = await this.payableRepository.findById(id);

        if (!payable) {
            throw new NotFoundException('Payable not found');
        }

        return payable;
    }

    async create(data: CreatePayableDto) {
        const assignor = await this.assignorRepository.findById(data.assignorId);

        if (!assignor) {
            throw new NotFoundException('Assignor not found');
        }

        return this.payableRepository.create(data)
    }

    async update(id: string, data: UpdatePayableDto) {
        const payable = await this.payableRepository.findById(id);

        if (!payable) {
            throw new NotFoundException('Payable not found');
        }

        if (data.assignorId) {
            const assignor = await this.assignorRepository.findById(data.assignorId);

            if (!assignor) {
                throw new NotFoundException('Assignor not found');
            }
        }

        return this.payableRepository.update(id, data)
    }

    async delete(id: string) {
        const payable = await this.payableRepository.findById(id);

        if (!payable) {
            throw new NotFoundException('Payable not found');
        }

        return this.payableRepository.delete(id)
    }
}
