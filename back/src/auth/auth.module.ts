import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config";
import { Env } from "../env";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(configService: ConfigService<Env>) {
                return {
                    secret: configService.get("JWT_SECRET", {infer: true}),
                }
            }
        })
    ]
})
export class AuthModule {
}