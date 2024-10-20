import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { clerkMiddleware } from '@clerk/express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'https://animals-store-client.vercel.app'],  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  app.use(clerkMiddleware());

  app.use(cookieParser());


  await app.listen(3000);
}

bootstrap();
