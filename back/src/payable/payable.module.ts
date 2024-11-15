import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from "./payable.repository";
import { PrismaModule } from "@/prisma/prisma.module";
import { AssignorModule } from "@/assignor/assignor.module";
import { BullModule } from "@nestjs/bull";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'payable',
        }),
        PrismaModule,
        AssignorModule,
    ],
    controllers: [PayableController],
    providers: [PayableService, PayableRepository]
})
export class PayableModule {
}
