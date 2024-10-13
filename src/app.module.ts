import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { CategoryModule } from './category/category.module';
import { AnimalController } from './animal/animal.controller';
import { AnimalService } from './animal/animal.service';
import { AnimalModule } from './animal/animal.module';



@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CarModule,
    CategoryModule,
    AnimalModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
