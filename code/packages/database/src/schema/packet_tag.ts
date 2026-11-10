import { primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { tags } from './tag.js';
import { packets } from './index.js';

export const packet_tags = sqliteTable(
    'packet_tag',
    t => ({
        epc: t
            .text('epc')
            .references(() => tags.epc)
            .notNull(),
        packetId: t
            .text('packet_id')
            .references(() => packets.id)
            .notNull()
    }),
    t => [
        primaryKey({
            columns: [t.epc, t.packetId]
        })
    ]
);
