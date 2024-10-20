import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  clerkUserId: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  image?: string;
  
  @IsOptional()
  email?: string;
}

