import { Hono } from 'hono';
import { db } from './lib/drizzle';
import { zValidator } from '@hono/zod-validator';
import { PayloadSchema } from '@rfidtool/contract';
import { packets } from '@rfidtool/database/schema';
import { cert } from './middleware/cert';
import { secure } from './middleware/secure';

/**
 * The device router is responsible for the following
 * - Registering new edge devices in the database
 * - Storing data received from edge devices
 * - Fetch raw packets from the database
 */
export const deviceRouter = new Hono<{ Bindings: CloudflareBindings }>()
    .post('/create', c => {
        // Create new devices in the database
        return c.text('TODO');
    })
    .post('/data', zValidator('json', PayloadSchema), cert, secure, async c => {
        const payload = c.req.valid('json');
        const { packets: payloadPackets } = payload;

        for (const packet of payloadPackets) {
            await db(c)
                .insert(packets)
                .values({
                    deviceCn: c.get('cert').cn,
                    payload: JSON.stringify(packet),
                    type: packet.type,
                    timestamp: new Date(packet.timestamp)
                });
        }

        return c.json({ success: true });
    })
    .get('/:cn/packets', async c => {
        const deviceCn = c.req.param('cn');
        const devicePackets = await db(c).query.packets.findMany({
            where: { deviceCn }
        });
        return c.json(devicePackets);
    });
