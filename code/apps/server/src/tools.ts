import { tags } from '@rfidtool/database/schema';
import { Hono } from 'hono';
import { db } from './lib/drizzle';
import { zValidator } from '@hono/zod-validator';
import { RFIDTagDataSchema } from '@rfidtool/contract';

/**
 * The tool router should be responsible for the following
 * - registering new tags
 * - creating new tools (names, images etc.)
 * - linking tags with tools (1:1 db relation)
 *
 * It should also be responsible for the actualy finding of a tool, and the last known location
 */
export const toolRouter = new Hono()
    .post('/tag', zValidator('json', RFIDTagDataSchema.pick({ epc: true })), async c => {
        const insertedTag = await db(c)
            .insert(tags)
            .values({
                epc: c.req.valid('json').epc
            })
            .onConflictDoNothing({
                target: tags.epc
            })
            .returning();

        return c.json(insertedTag);
    })
    .post('/', c => {
        // TODO: Create new tools in the database
        return c.text('TODO');
    })
    .put('/link', c => {
        // TODO: Link a tool with a tag
        return c.text('TODO');
    })
    .get('/', c => {
        // TODO: Search for a tool
        return c.text('TODO');
    });
