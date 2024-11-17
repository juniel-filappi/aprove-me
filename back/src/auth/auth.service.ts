import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { LoginDto } from '@/shared/dto/auth/login.dto';
import { UserService } from '@/user/user.service';
import { compare } from 'bcryptjs';
import { RegisterDto } from '@/shared/dto/auth/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isValid = await compare(loginDto.password, user.password);

    if (!isValid) {
      throw new BadRequestException('Credenciais inválidas');
    }

    return {
      user,
      access_token: this.jwt.sign({ sub: user.id }),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findUserByEmail(registerDto.email);

    if (user) {
      throw new ConflictException('Usuário já cadastrado');
    }

    return this.userService.create(registerDto);
  }

  async me(id: string) {
    return this.userService.findById(id);
  }
}
