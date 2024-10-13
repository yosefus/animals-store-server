import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Animal, AnimalSchema } from './animal.schema';
import { Category, CategorySchema } from '../category/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Animal.name, schema: AnimalSchema },
      { name: Category.name, schema: CategorySchema }
    ]),
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService],
})
export class AnimalModule {}