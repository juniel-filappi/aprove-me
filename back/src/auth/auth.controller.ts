import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "@/shared/dto/auth/login.dto";
import { RegisterDto } from "@/shared/dto/auth/register.dto";

@Controller("/auth")
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) {}

    @Post("/login")
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        return this.service.login(loginDto);
    }

    @Post("/register")
    async register(@Body() registerDto: RegisterDto) {
        return this.service.register(registerDto);
    }
}