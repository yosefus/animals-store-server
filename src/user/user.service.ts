import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from './user.dto';
import { createClerkClient } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import { clerkClient } from '@clerk/express';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private jwtService: JwtService,
      private configService: ConfigService
   ) {
   }
   async getAllClerck() {
      return clerkClient.users.getUserList();
   }

   async findUserByClerkId(id: string) {
      return this.userModel.findOne({ clerkUserId: id });
   }

   async createUser(user: RegisterUserDto) {
      return this.userModel.create(user);
   }
}