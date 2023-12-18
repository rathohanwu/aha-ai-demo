import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {activeSessionTracker} from './utils/active-session';
import {prisma} from './lib/db';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
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
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(activeSessionTracker);
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  });
  await prisma.$connect();
  await app.listen(3020);
}

bootstrap();
