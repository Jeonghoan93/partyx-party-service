import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const validatedUser = await this.authService.validateUser({
      email,
      password,
    });
    if (!validatedUser) {
      throw new UnauthorizedException();
    }
    return validatedUser;
  }
}
