import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  readonly make: string;

  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly mileage?: number;

  @IsOptional()
  @IsString()
  readonly fuelType?: string;

  @IsOptional()
  @IsString()
  readonly transmission?: string;
}
