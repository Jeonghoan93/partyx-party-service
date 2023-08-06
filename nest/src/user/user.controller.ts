import { Controller, Get, Param } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  // Add other routes for CRUD operations as needed...
}
