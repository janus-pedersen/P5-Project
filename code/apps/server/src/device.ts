import { Hono } from 'hono';
import { db } from './lib/drizzle';

export const deviceRouter = new Hono<{ Bindings: CloudflareBindings }>().get('/', async (c) => {
    const result = await db(c).query.devices.findMany();
    return c.json({ status: 'Ok', data: result });
});
