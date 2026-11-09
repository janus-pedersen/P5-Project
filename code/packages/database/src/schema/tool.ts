import { sqliteTable } from "drizzle-orm/sqlite-core";

export const tools = sqliteTable('tool', t => ({
    // TODO: implement tool table
    // - 1:1 relation with tags
    // - tool name, keywords, images and such
})