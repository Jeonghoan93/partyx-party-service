import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/common/interfaces/user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Ensure this is the same secret you use in AuthService
    });
  }

  async validate(payload: { email: string; sub: string }): Promise<User> {
    const user = await this.authService.getCurrentUser(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
