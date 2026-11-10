import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const packets = sqliteTable('packet', t => ({
    id: t
        .text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    deviceCn: t.text('device_cn').notNull(),
    type: t.text('type').notNull(),
    timestamp: t.integer({ mode: 'timestamp_ms' }).notNull(),
    payload: t.text({ mode: 'json' }).notNull(),
    recieved: t
        .integer({ mode: 'timestamp_ms' })
        .notNull()
        .default(sql`(unixepoch('subsec') * 1000)`)
}));
