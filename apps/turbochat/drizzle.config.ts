import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path: '.env.local',
});

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint: Forbidden non-null assertion.
    url: 'postgresql://turbochat-demo_owner:npg_P3NrmzlV2Riq@ep-plain-resonance-a9494isk-pooler.gwc.azure.neon.tech/turbochat-demo?sslmode=require&channel_binding=require',
  },
});
