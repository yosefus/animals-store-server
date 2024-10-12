import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  image: string; // URL for the car's image

  @Prop()
  description: string; // A short description about the car

  @Prop()
  mileage: number; // Car's mileage

  @Prop()
  fuelType: string; // Fuel type (e.g., 'Petrol', 'Diesel', 'Electric')

  @Prop()
  transmission: string; // e.g., 'Manual', 'Automatic'

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
