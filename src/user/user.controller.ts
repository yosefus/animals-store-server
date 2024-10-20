import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ClerkAuthGuard } from '../clerk/clerk.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all-users-clerck')
  async getAllClerck() {
    return this.userService.getAllClerck()
  }

  @Get('test')
  @UseGuards(ClerkAuthGuard)
  async test() {
    return { status: 200, }
  }
}
