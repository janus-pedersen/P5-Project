import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const devices = sqliteTable('device', t => ({
    cn: t.text('cn').notNull(),
    fingerprint: t.text('fingerprint').notNull()
}));
