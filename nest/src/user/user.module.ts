import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service'; // If you plan to use some services from auth in user module.
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600, // 1 hour
      },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService], // You might want to export the UserService if other modules need to use it.
})
export class UserModule {}
