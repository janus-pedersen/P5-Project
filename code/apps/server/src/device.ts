import { Hono } from 'hono';
import { db } from './lib/drizzle';
import { zValidator } from '@hono/zod-validator';
import { PayloadSchema } from '@rfidtool/contract';
import { packets } from '@rfidtool/database/schema';
import { cert } from './middleware/cert';
import { secure } from './middleware/secure';

export const deviceRouter = new Hono<{ Bindings: CloudflareBindings }>()
    .post('/data', zValidator('json', PayloadSchema), cert, secure, async c => {
        const payload = c.req.valid('json');
        const { packets: payloadPackets } = payload;

        for (const packet of payloadPackets) {
            await db(c)
                .insert(packets)
                .values({
                    deviceCn: c.get('cert').deviceCn,
                    payload: JSON.stringify(packet),
                    type: packet.type,
                    timestamp: new Date(packet.timestamp)
                });
        }

        return c.json({ success: true });
    })
    .get('/:deviceCn/packets', async c => {
        const deviceCn = c.req.param('deviceCn');
        const devicePackets = await db(c).query.packets.findMany({
            where: { deviceCn }
        });
        return c.json(devicePackets);
    });
