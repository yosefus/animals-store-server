import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  countInStock: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  numReviews: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}