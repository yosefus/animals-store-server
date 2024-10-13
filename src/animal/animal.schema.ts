import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../category/category.schema';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  countInStock: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  numReviews: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  category: Category;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
