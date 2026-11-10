import { sql } from 'drizzle-orm';
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { tags } from './index.js';

export const tools = sqliteTable('tool', t => ({
    id: t
        .text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: t.text('name').notNull(),
    description: t.text('description'),
    createdAt: t
        .integer({ mode: 'timestamp_ms' })
        .notNull()
        .default(sql`(unixepoch('subsec') * 1000)`),
    epc: t.text('epc').references(() => tags.epc)
}));
