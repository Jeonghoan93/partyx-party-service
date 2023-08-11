import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Users } from 'src/common/schema/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(dto: CreateUserDto): Promise<Users> {
    return this.userService.create(dto);
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string): Promise<Users> {
    return this.userService.findByEmail(email);
  }

  @Patch(':email')
  async updateUserByEmail(
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<Users> {
    return this.userService.updateUserByEmail(email, password);
  }

  @Delete(':email')
  async deleteUserByEmail(@Param('email') email: string) {
    await this.userService.deleteUserByEmail(email);
    return { message: 'User deleted successfully.' };
  }
  // Add other routes for CRUD operations as needed...
}
