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
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { PayableService } from './payable.service';
import { CreatePayableDto } from '@/shared/dto/payable/create-payable.dto';
import { UpdatePayableDto } from '@/shared/dto/payable/update-payable.dto';
import { BatchPayableDto } from '@/shared/dto/payable/batch-payable.dto';

@Controller('/payable')
@UseGuards(JwtAuthGuard)
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreatePayableDto) {
    return this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePayableDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post('/batch')
  async processBatch(@Body() request: BatchPayableDto) {
    await this.service.enqueuePayables(request.payables);

    return {
      message: 'Batch process started',
    };
  }
}
