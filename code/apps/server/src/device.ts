import { Hono } from 'hono';

export const deviceRouter = new Hono<{ Bindings: CloudflareBindings }>().post('/sync', c => {
    return c.json({ status: 'Ok' });
});
