import { Controller, Delete, Get, Param } from '@nestjs/common';
import { User } from '../../common/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Delete(':email')
  async deleteUserByEmail(@Param('email') email: string) {
    await this.userService.deleteUserByEmail(email);
    return { message: 'User deleted successfully.' };
  }
  // Add other routes for CRUD operations as needed...
}
