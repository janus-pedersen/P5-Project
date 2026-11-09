import { Hono } from 'hono';
import { deviceRouter } from './device';
import { toolRouter } from './tools';

const app = new Hono<{ Bindings: CloudflareBindings }>()
    .route('/device', deviceRouter)
    .route('/tool', toolRouter)
    .get('/', async c => {
        return c.text('Hello world!');
    });

export default app;
