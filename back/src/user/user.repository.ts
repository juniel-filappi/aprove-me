import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { RegisterDto } from "@/shared/dto/auth/register.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findUnique(where: { email: string }) {
        return this.prisma.user.findUnique({ where });
    }

    async create(data: RegisterDto) {
        const dataCreate = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        return this.prisma.user.create({ data: dataCreate });
    }
}