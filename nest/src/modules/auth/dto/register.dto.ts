import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(10)
  readonly password: string;

  @IsString()
  @MinLength(10)
  readonly confirmPassword: string;
}
