import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default(process.env.NODE_ENV || 'development'),
  GEMINI_API_KEY: z.string().default(String(process.env.GEMINI_API_KEY)),
  FIREBASE_API_KEY: z.string().default(String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)),
  FIREBASE_AUTH_DOMAIN: z.string().default(String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)),
  FIREBASE_PROJECT_ID: z.string().default(String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)),
  FIREBASE_STORAGE_BUCKET: z.string().default(String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)),
  FIREBASE_MESSAGING_SENDER_ID: z.string().default(String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)),
  FIREBASE_APP_ID: z.string().default(String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID)),
});

export const ENV = Object.freeze(envSchema.parse(process.env));
