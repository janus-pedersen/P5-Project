import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const devices = sqliteTable('device', t => ({
    cn: t.text('cn').notNull(),
    mac: t.text('mac').notNull(),
}));
