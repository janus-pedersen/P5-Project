import { sql } from "drizzle-orm/sql/sql";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const tags = sqliteTable('tag', t => ({
    epc: t.text('epc').primaryKey(),
    createdAt: t
            .integer({ mode: 'timestamp_ms' })
            .notNull()
            .default(sql`(unixepoch('subsec') * 1000)`)
}))