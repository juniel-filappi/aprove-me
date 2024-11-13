import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    JWT_EXPIRATION_TIME: z.coerce.number().positive(),
    PORT: z.coerce.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>;