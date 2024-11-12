import { Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Controller("/auth")
export class AuthenticateController {
    constructor(private readonly jwt: JwtService) {}

    @Post("/login")
    async login() {
        const token = this.jwt.sign({ sub: 1 });

        return token;
    }
}