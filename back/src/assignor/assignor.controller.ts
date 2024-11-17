import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from '@/shared/dto/assignor/create-assignor.dto';
import { UpdateAssignorDto } from '@/shared/dto/assignor/update-assignor.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('/assignor')
@UseGuards(JwtAuthGuard)
export class AssignorController {
  constructor(private readonly service: AssignorService) {}

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getAssignor(@Param('id') id: string) {
    return this.service.getAssignor(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateAssignorDto) {
    return this.service.create(request);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateAssignorDto) {
    return this.service.update(id, request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
