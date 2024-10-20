import { clerkClient } from '@clerk/express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private configService: ConfigService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Ensure clerkMiddleware has already been applied globally
    const auth = request.auth;
    if (!auth || !auth.userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      // Fetch the Clerk user by userId
      const clerkUser = await clerkClient.users.getUser(auth.userId);
      let user = await this.userService.findUserByClerkId(clerkUser.id);

      // If the user doesn't exist in your database, create a new one
      if (!user) {
        user = await this.userService.createUser({
          clerkUserId: clerkUser.id,
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
        });
      }

      request.user = user;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Error authenticating user');
    }
  }
}
