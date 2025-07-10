import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Database connection (server-side, sensitive)
    DATABASE_URL: z.string().url().min(1, "DATABASE_URL is required"),

    // Clerk secret key (server-side, sensitive)
    CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),

    // Stack secret server key (server-side, sensitive)
    STACK_SECRET_SERVER_KEY: z
      .string()
      .min(1, "STACK_SECRET_SERVER_KEY is required"),

    // Vercel Blob read-write token (server-side, sensitive)
    BLOB_READ_WRITE_TOKEN: z
      .string()
      .min(1, "BLOB_READ_WRITE_TOKEN is required"),

    // OpenAI API key (server-side, sensitive)
    OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),

    // Stripe secret key (server-side, sensitive)
    STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
    // Stripe webhook secret (server-side, sensitive)
    STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is required"),
  },
  client: {
    // Clerk publishable key (client-side, safe to expose)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),

    // Stack publishable client key (client-side, safe to expose)
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z
      .string()
      .min(1, "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY is required"),

    // Stack project ID (client-side, safe to expose)
    NEXT_PUBLIC_STACK_PROJECT_ID: z
      .string()
      .uuid("NEXT_PUBLIC_STACK_PROJECT_ID must be a valid UUID"),

    // Clerk sign-in and sign-up URLs (client-side, safe to expose)
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z
      .string()
      .min(1, "NEXT_PUBLIC_CLERK_SIGN_IN_URL is required"),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z
      .string()
      .min(1, "NEXT_PUBLIC_CLERK_SIGN_UP_URL is required"),

    // Stripe publishable key (client-side, safe to expose)
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
      .string()
      .min(1, "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required"),

    // Stripe price IDs (client-side, safe to expose)
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: z
      .string()
      .min(1, "NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY is required"),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY: z
      .string()
      .min(1, "NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY is required"),

    // Base URL for the app (client-side, safe to expose)
    NEXT_PUBLIC_BASE_URL: z
      .string()
      .url()
      .min(1, "NEXT_PUBLIC_BASE_URL is required"),
  },
  runtimeEnv: {
    // Server-side variables
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

    // Client-side variables
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY:
      process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
