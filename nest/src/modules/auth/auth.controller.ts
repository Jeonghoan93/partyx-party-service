import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
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
  async register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUSer(@Req() req: any) {
    const email = req.session?.user?.email;

    const currentUser = await this.authService.getCurrentUser(email);

    return currentUser;
  }

  @Get('current-user')
  async getCurrentUser(@Req() req: Request) {
    const user = await this.authService.getCurrentUser(req.session);

    if (!user) {
      throw new UnauthorizedException('No current user found');
    }

    return user;
  }
}
