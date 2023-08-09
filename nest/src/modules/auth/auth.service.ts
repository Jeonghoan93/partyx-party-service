import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/interfaces/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;

    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterUserDto): Promise<User> {
    if (dto.password !== dto.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    return this.userService.create(dto);
  }

  async getCurrentUser(userId: string): Promise<User> {
    return this.userService.findById(userId);
  }
}
