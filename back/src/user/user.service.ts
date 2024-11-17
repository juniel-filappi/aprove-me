import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterDto } from '@/shared/dto/auth/register.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findById(id: string) {
    return this.repository.findByEmail(id);
  }

  async findUserByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async create(registerDto: RegisterDto) {
    const user = await this.findUserByEmail(registerDto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(registerDto.password, 8);

    const dataToSave = {
      ...registerDto,
      password: hashedPassword,
    };

    return this.repository.create(dataToSave);
  }
}
