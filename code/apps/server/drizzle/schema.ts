import { sqliteTable, primaryKey, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const device = sqliteTable("device", {
	name: text().primaryKey(),
});

export const packet = sqliteTable("packet", {
	id: text(),
	type: text().notNull(),
	deviceName: text(),
	payload: text(),
	timestmap: integer(),
});

