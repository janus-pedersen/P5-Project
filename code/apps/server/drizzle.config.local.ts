import 'dotenv/config';
//import { createRequire } from 'node:module';
import { defineConfig } from 'drizzle-kit';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const dir = resolve('.wrangler/state/v3/d1/miniflare-D1DatabaseObject');

const file = readdirSync(dir).find(file => {
    if (!file.endsWith('.sqlite')) return false;
    if (file === 'metadata.sqlite') return false;

    const db = new Database(resolve(dir, file), { readonly: true, fileMustExist: true });

    try {
        return !!db
            .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='packet'")
            .get();
    } finally {
        db.close();
    }
});

if (!file) {
    throw new Error('No database file found');
}

//const require = createRequire(import.meta.url);

export default defineConfig({
    schema: fileURLToPath(import.meta.resolve('@rfidtool/database/schema')),
    dialect: 'sqlite',
    dbCredentials: {
        url: resolve(dir, file)
    }
});
