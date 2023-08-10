import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '../../common/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Delete(':email')
  async deleteUserByEmail(@Param('email') email: string) {
    await this.userService.deleteUserByEmail(email);
    return { message: 'User deleted successfully.' };
  }
  // Add other routes for CRUD operations as needed...
}
