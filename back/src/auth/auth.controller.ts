import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@/shared/dto/auth/login.dto';
import { RegisterDto } from '@/shared/dto/auth/register.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UserPayload } from '@/auth/jwt.strategy';
import { CurrentUser } from '@/shared/decorator/currente-user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.service.register(registerDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: UserPayload) {
    return this.service.me(user.sub);
  }
}
