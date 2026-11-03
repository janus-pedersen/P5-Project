/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';
//import { createRequire } from 'node:module';
import { defineConfig } from 'drizzle-kit';
import { fileURLToPath } from 'node:url';

//const require = createRequire(import.meta.url);

export default defineConfig({
    out: './drizzle',
    //schema: require.resolve('@rfidtool/database/schema'),
    schema: fileURLToPath(import.meta.resolve('@rfidtool/database/schema')),
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_D1_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!
    }
});
