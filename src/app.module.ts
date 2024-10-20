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
import { Connection } from 'mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URI
      , {
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log('connected 🚀'));
          connection.on('open', () => console.log('open 🚀'));
          connection.on('disconnected', () => console.log('disconnected 😫'));
          connection.on('reconnected', () => console.log('reconnected 🚀'));
          connection.on('disconnecting', () => console.log('disconnecting 😣'));
          return connection;
        },
      }),
    CarModule,
    CategoryModule,
    AnimalModule,
    UserModule

  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
