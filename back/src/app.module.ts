import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { APP_PIPE } from "@nestjs/core";
import { MailerConfigModule } from './mailer/mailer.module';
import { BullModule } from "@nestjs/bull";
import { PayableProcessor } from "@/payable/payable.processor";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: env => envSchema.parse(env),
            isGlobal: true,
        }),
        PrismaModule,
        MailerConfigModule,
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    redis: {
                        host: configService.get('REDIS_HOST', { infer: true }),
                        port: configService.get('REDIS_PORT', { infer: true }),
                    }
                }
            }
        }),
        AuthModule,
        UserModule,
        PayableModule,
        AssignorModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        PayableProcessor
    ]
})
export class AppModule {
}
