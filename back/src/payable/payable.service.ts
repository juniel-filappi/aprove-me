import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from "../shared/dto/payable/create-payable.dto";
import { PayableRepository } from "./payable.repository";
import { AssignorRepository } from "../assignor/assignor.repository";

@Injectable()
export class PayableService {
    constructor(
        private readonly payableRepository: PayableRepository,
        private readonly assignorRepository: AssignorRepository,
    ) {
    }

    async create(data: CreatePayableDto) {
        const assignor = await this.assignorRepository.findById(data.assignorId);

        if (!assignor) {
            throw new NotFoundException('Assignor not found');
        }

        return this.payableRepository.create(data)
    }
}
