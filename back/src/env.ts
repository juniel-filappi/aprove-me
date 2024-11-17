import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.coerce.number().positive(),
  PORT: z.coerce.number().optional().default(3333),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number().positive(),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
