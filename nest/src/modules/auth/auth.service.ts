import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/common/schema/users';
import { comparePassword } from 'src/common/util/password-manager';
import { generateAuthToken } from 'src/common/util/token-generator';
import { UserService } from 'src/modules/user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(dto: LoginUserDto): Promise<Users | null> {
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

  async login(email: string, password: string): Promise<any> {
    try {
      const userExists = await this.userService.findByEmail(email);

      if (!userExists) {
        throw new BadRequestException('User not found');
      }

      // if (!userExists.isVerified) {
      //   throw new BadRequestException('Please verify your email');
      // }

      const isPasswordMatching = await comparePassword(
        password,
        userExists.password,
      );

      if (!isPasswordMatching) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = await generateAuthToken(userExists._id);

      return {
        success: true,
        message: 'Login successful',
        result: {
          user: {
            email: userExists.email,
            firstName: userExists.firstName,
            type: userExists.type,
            id: userExists._id.toString(),
          },
          token,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async register(dto: RegisterUserDto): Promise<Users> {
    if (dto.password !== dto.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    return this.userService.create(dto);
  }

  async getCurrentUser(email: string): Promise<Users> {
    return this.userService.findByEmail(email);
  }
}
