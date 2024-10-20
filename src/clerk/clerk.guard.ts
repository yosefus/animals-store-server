import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { clerkClient, verifyToken } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private configService: ConfigService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token =  request.cookies['__session'];  

    if (!token) 
      throw new UnauthorizedException('No token provided');

    try {
      const payload = await verifyToken(token, { jwtKey: this.configService.get('CLERK_JWT_KEY') });
      
      if (!payload) 
        throw new UnauthorizedException('Invalid token');
      
      const clerkUser = await clerkClient.users.getUser(payload.sub);
      
      let user = await this.userService.findUserByClerkId(clerkUser.id);

      console.log(clerkUser);
      
      if (!user) {
        user = await this.userService.createUser({
          clerkUserId: clerkUser.id,
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
        });
      }
      console.log({user});
      
      request.user = user;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}