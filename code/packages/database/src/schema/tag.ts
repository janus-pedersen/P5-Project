import { sqliteTable } from "drizzle-orm/sqlite-core";

export const tags = sqliteTable('tag', t => ({
    // TODO: implement tag table (epc, and other rfid tag specifics)
})