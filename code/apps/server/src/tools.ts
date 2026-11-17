import { tags, ToolInsertSchema, tools } from '@rfidtool/database/schema';
import { Hono } from 'hono';
import { db } from './lib/drizzle';
import { zValidator } from '@hono/zod-validator';
import { RFIDTagDataSchema } from '@rfidtool/contract';
import z from 'zod';
import { eq } from 'drizzle-orm/sql/expressions/index';

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
    .post(
        '/',
        zValidator('json', ToolInsertSchema.omit({ id: true, createdAt: true })),
        async c => {
            const toolData = c.req.valid('json');
            const insertedTool = await db(c).insert(tools).values(toolData).returning();
            return c.json(insertedTool);
        }
    )
    .put(
        '/link',
        zValidator('json', z.object({ toolId: z.uuid(), epc: ToolInsertSchema.shape.epc })),
        async c => {
            const updatedTool = await db(c)
                .update(tools)
                .set({
                    epc: c.req.valid('json').epc
                })
                .where(eq(tools.id, c.req.valid('json').toolId))
                .returning();
            return c.json(updatedTool);
        }
    )
    .get('/', zValidator('query', z.object({ q: z.string().optional() })), async c => {
        const { q } = c.req.valid('query');
        const result = await db(c).query.tools.findMany({
            limit: 10,
            where: {
                OR: [
                    {
                        name: {
                            like: `%${q}%`
                        }
                    },
                    {
                        description: {
                            like: `%${q}%`
                        }
                    }
                ]
            }
        });
        return c.json(result);
    })

    .get('/packets', zValidator('query', z.object({ toolId: z.string() })), async c => {
        const { toolId } = c.req.valid('query');
        const tool = await db(c).select().from(tools).where(eq(tools.id, toolId)).get();
        if (!tool) {
            return c.json({ error: 'Tool not found' }, 404);
        }
        if (!tool.epc) {
            return c.json({ error: 'No tag assigned' }, 400);
        }
        const packets = await db(c).query.packets.findMany({
            where: {
                packet_tags: {
                    epc: tool.epc
                }
            }
        });
        return c.json(packets);
    });
