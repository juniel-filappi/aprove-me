import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { PayableService } from "./payable.service";
import { CreatePayableDto } from "@/shared/dto/payable/create-payable.dto";
import { UpdatePayableDto } from "@/shared/dto/payable/update-payable.dto";

@Controller('/payable')
@UseGuards(JwtAuthGuard)
export class PayableController {
    constructor(private readonly service: PayableService) {
    }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(id: string) {
        return this.service.getById(id);
    }

    @Post('/')
    async create(@Body() body: CreatePayableDto) {
        return this.service.create(body);
    }

    @Put(':id')
    async update(id: string, @Body() body: UpdatePayableDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    async delete(id: string) {
        return this.service.delete(id);
    }
}
