import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PayableService } from "./payable.service";
import { CreatePayableDto } from "../shared/dto/payable/create-payable.dto";

@Controller('/integrations/payable')
@UseGuards(JwtAuthGuard)
export class PayableController {
    constructor(private readonly service: PayableService) {
    }

    @Post('/')
    async create(@Body() body: CreatePayableDto) {
        return this.service.create(body);
    }
}
