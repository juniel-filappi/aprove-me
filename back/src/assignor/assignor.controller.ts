import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AssignorService } from "./assignor.service";
import { CreateAssignorDto } from "@/shared/dto/assignor/create-assignor.dto";
import { UpdateAssignorDto } from "@/shared/dto/assignor/update-assignor.dto";

@Controller('/assignor')
export class AssignorController {
    constructor(private readonly service: AssignorService) {
    }

    @Get()
    async getAll() {
        return this.service.getAll()
    }

    @Get(':id')
    async getAssignor(id: string) {
        return this.service.getAssignor(id)
    }

    @Post()
    async create(@Body() request: CreateAssignorDto) {
        return this.service.create(request)
    }

    @Put(':id')
    async update(id: string, @Body() request: UpdateAssignorDto) {
        return this.service.update(id, request)
    }

    @Delete(':id')
    async delete(id: string) {
        return this.service.delete(id)
    }
}
