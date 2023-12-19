import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {activeSessionTracker} from './utils/active-session';
import {prisma} from './lib/db';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const swaggerDocument = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('doc', app, swaggerDocument);

  app.use(activeSessionTracker);
  app.use(cookieParser());

  app.enableCors(corsConfig);
  await prisma.$connect();
  await app.listen(3020);
}

const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  methods: ['GET', 'POST', 'PATCH'],
};

const documentConfig = new DocumentBuilder()
  .setTitle('AHA Demo API Example')
  .setDescription('AHA Demo API Example')
  .setVersion('1.0')
  .addTag('AHA Demo API')
  .addBearerAuth(
    {
      description: 'Enter the Auth Token',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    },
    'access-token'
  )
  .build();

bootstrap();
