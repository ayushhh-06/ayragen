import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('AuraGen_Core');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Security & Performance
  app.use(helmet());
  app.use(compression());

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // JSON Payload Limits
  const { json, urlencoded } = require('body-parser');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('AuraGen Cinematic API')
    .setDescription('The core intelligence and generation engine for AuraGen.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('websites', 'Cinematic website generation and management')
    .addTag('auth', 'Authentication and identity management')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port, '127.0.0.1');

  logger.log(`🚀 AuraGen API is live on: http://localhost:${port}`);
  logger.log(`🛠️ Filters, Pipes, and Interceptors are active.`);
}
bootstrap();
