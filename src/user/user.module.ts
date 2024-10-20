import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User model here
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET, // Your JWT secret key
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ConfigService],
  exports: [UserService],
})
export class UserModule {}
