import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUser: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginRes = await this.authService.login(
      loginUser.email,
      loginUser.password,
    );
    if (loginRes.success) {
      res.cookie('_digi_auth_token', loginRes.result?.token, {
        httpOnly: true,
      });
    }
    delete loginRes.result?.token;

    return loginRes;
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUSer(@Request() req) {
    return this.authService.getCurrentUser(req.user.email);
  }

  // Add registration, password reset, etc. as needed.
}
