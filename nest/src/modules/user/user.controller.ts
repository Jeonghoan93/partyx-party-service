import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../../common/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  // Add other routes for CRUD operations as needed...
}
