import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './logic/common/filters/all-exceptions.filter';
import configuration from './config/configuration';
import { validate } from './config/env.validation';

// --- CATEGORIZED BACKEND CORE ---
import { AiEngineModule } from './logic/ai/ai-engine.module';
import { PublishingModule } from './logic/publishing/publishing.module';
import { CommerceModule } from './payments/commerce.module';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './security/auth.module';
import { UserModule } from './security/user.module';
import { CommonModule } from './logic/common/common.module';
import { AssetsModule } from './logic/assets/assets.module';

import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggingInterceptor } from './logic/common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),
    
    // --- BACKEND CATEGORIES ---
    PrismaModule,     // [DATABASE]
    AuthModule,       // [SECURITY]
    UserModule,       // [SECURITY]
    AiEngineModule,   // [AI LOGIC]
    PublishingModule, // [PUBLISHING LOGIC]
    CommerceModule,   // [PAYMENTS]
    CommonModule,     // [CORE LOGIC]
    AssetsModule,     // [ASSETS]
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
