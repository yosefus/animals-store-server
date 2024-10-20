import { Module, Global } from '@nestjs/common';
import { ClerkAuthGuard } from './clerk.guard';
import { PermissionGuard } from './permission.guard';
import { User, UserSchema } from 'src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Global()
@Module({
  providers: [ClerkAuthGuard, PermissionGuard, UserService],
  exports: [ClerkAuthGuard, PermissionGuard],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class AuthModule {}