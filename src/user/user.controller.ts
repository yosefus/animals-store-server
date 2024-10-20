import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/clerk/clerk.guard';
import { UserService } from './user.service';

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
