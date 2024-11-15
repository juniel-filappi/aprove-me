import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { AssignorRepository } from "./assignor.repository";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [
        AssignorService,
        AssignorRepository
    ],
    controllers: [AssignorController],
    exports: [AssignorRepository]
})
export class AssignorModule {
}
