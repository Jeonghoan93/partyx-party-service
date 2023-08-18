import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/common/schemas/users';
import { comparePassword } from 'src/common/util/password-manager';
import { generateAuthToken } from 'src/common/util/token-generator';
import { UserService } from 'src/modules/user/user.service';
import { LoginUserDto } from './dto/login.dto';

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
    console.log('Object:', email, password);

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

  async register(dto: any): Promise<Users> {
    return this.userService.create(dto);
  }

  async getCurrentUser(req: any): Promise<Partial<Users> | null> {
    try {
      const session = req.session;
      if (!session?.user?.email) {
        return null;
      }

      const currentUser = await this.userService.findByEmail(
        session.user.email,
      );

      if (!currentUser) {
        return null;
      }

      return {
        ...currentUser,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
        emailVerified: currentUser.emailVerified,
      };
    } catch (err) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
