import { Hono } from 'hono';
import { deviceRouter } from './device';

const app = new Hono<{ Bindings: CloudflareBindings }>()
    .route('/device', deviceRouter)
    .get('/', async c => {
        return c.text('Hello world!');
    });

export default app;
