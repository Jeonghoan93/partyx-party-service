import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  firstName: string;
}
