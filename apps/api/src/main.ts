import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
// Triggering production deployment for Auth Sync Fix
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger('AuraGen_Core');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // Ensure temp_exports directory exists
  const exportsPath = join(process.cwd(), 'temp_exports');
  if (!fs.existsSync(exportsPath)) fs.mkdirSync(exportsPath, { recursive: true });

  app.useStaticAssets(exportsPath, {
    prefix: '/temp_exports',
  });

  // Security & Performance
  // Enterprise Security Hardening
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://res.cloudinary.com"],
        connectSrc: ["'self'", "wss://localhost:3007", "http://localhost:3007"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", "https://www.soundhelix.com"],
        frameSrc: ["'none'"],
      },
    },
  }));
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

  const port = process.env.PORT || 3007;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 AuraGen API is live on port: ${port}`);
  logger.log(`🛠️ Filters, Pipes, and Interceptors are active.`);
}
bootstrap();
