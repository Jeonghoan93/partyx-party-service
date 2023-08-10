import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async validateUser(dto: LoginUserDto): Promise<User | null> {
    // checking the credentials of the user.
    const user = await this.userService.findByEmail(dto.email);

    if (!user) return null;

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async login(dto: LoginUserDto) {
    // creating the JWT once the user's credentials have been validated.
    const user = await this.validateUser(dto);

    const payload = { email: user.email, sub: user._id };
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

  async getCurrentUser(email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }
}
