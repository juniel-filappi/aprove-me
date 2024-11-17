import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from '@/shared/dto/payable/create-payable.dto';
import { UpdatePayableDto } from '@/shared/dto/payable/update-payable.dto';

@Injectable()
export class PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
      include: { assignor: true },
    });
  }

  async getAll() {
    return this.prisma.payable.findMany({
      include: {
        assignor: true,
      },
    });
  }

  async create(data: CreatePayableDto) {
    const dateCreation: CreatePayableDto = {
      emissionDate: data.emissionDate,
      value: data.value,
      assignorId: data.assignorId,
    };

    if (data.id) {
      dateCreation.id = data.id;
    }

    return this.prisma.payable.create({
      data: dateCreation,
    });
  }

  async update(id: string, data: UpdatePayableDto) {
    const dataUpdate: UpdatePayableDto = {
      emissionDate: data.emissionDate,
      value: data.value,
      assignorId: data.assignorId,
    };

    return this.prisma.payable.update({ where: { id }, data: dataUpdate });
  }

  async delete(id: string) {
    return this.prisma.payable.delete({ where: { id } });
  }
}
