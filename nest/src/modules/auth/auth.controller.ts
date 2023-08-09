import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.validateUser(dto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Request() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUSer(@Request() user: User) {
    return this.authService.getCurrentUser(user.email);
  }

  // Add registration, password reset, etc. as needed.
}
