import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config";
import { Env } from "@/env";
import { UserModule } from "@/user/user.module";
import { PrismaModule } from "@/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(configService: ConfigService<Env>) {
                return {
                    secret: configService.get("JWT_SECRET", {infer: true}),
                    signOptions: {
                        expiresIn: configService.get("JWT_EXPIRATION_TIME", {infer: true})
                    }
                }
            }
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}