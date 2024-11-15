import { Module } from '@nestjs/common';
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { Env } from "@/env";

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory(configService: ConfigService<Env>) {
                return {
                    transport: {
                        host: configService.get('EMAIL_HOST', { infer: true }),
                        port: configService.get('EMAIL_PORT', { infer: true }),
                        auth: {
                            user: configService.get('EMAIL_USER', { infer: true }),
                            pass: configService.get('EMAIL_PASSWORD', { infer: true }),
                        },
                    },
                }
            }
        })
    ]
})
export class MailerConfigModule {
}
