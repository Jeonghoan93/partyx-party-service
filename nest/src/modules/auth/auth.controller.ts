import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
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
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.validateUser(dto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const result = this.authService.login(user);
    return res.status(HttpStatus.OK).send(result);
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUSer(@Request() user: User) {
    return this.authService.getCurrentUser(user.email);
  }

  // Add registration, password reset, etc. as needed.
}
