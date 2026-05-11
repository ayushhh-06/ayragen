import { z } from 'zod';

export const EnvSchema = z.object({
  // CORE
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001').transform(Number),
  
  // AI
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  
  // ASSETS
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  
  // INFRA
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  
  // DEPLOYMENT
  VERCEL_TOKEN: z.string().optional(),
  VERCEL_PROJECT_ID: z.string().optional(),
  
  // SECURITY
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

export function validate(config: Record<string, any>) {
  const result = EnvSchema.safeParse(config);

  if (!result.success) {
    console.error('❌ FATAL: Environment validation failed!');
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error('Invalid environment configuration');
  }

  return result.data;
}
