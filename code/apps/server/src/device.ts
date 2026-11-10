import { Hono } from 'hono';
import { db } from './lib/drizzle';
import { zValidator } from '@hono/zod-validator';
import { PayloadSchema } from '@rfidtool/contract';
import { packets, packet_tags, tags } from '@rfidtool/database/schema';
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
            const dbPackets = await db(c)
                .insert(packets)
                .values({
                    deviceCn: c.get('cert').cn,
                    payload: JSON.stringify(packet),
                    type: packet.type,
                    timestamp: new Date(packet.timestamp)
                })
                .returning();

            switch (packet.type) {
                case 'RFID_TAG_EVENT':
                    await db(c).batch([
                        db(c)
                            .insert(tags)
                            .values({
                                epc: packet.tag.epc
                            })
                            .onConflictDoNothing({
                                target: tags.epc
                            }),

                        db(c)
                            .insert(packet_tags)
                            .values({
                                epc: packet.tag.epc,
                                packetId: dbPackets[0].id
                            })
                            .onConflictDoNothing({
                                target: [packet_tags.epc, packet_tags.packetId]
                            })
                    ]);
                    break;
                case 'RFID_TAG_SNAPSHOT':
                    for (const tag of packet.tags) {
                        await db(c).batch([
                            db(c)
                                .insert(tags)
                                .values({
                                    epc: tag.epc
                                })
                                .onConflictDoNothing({
                                    target: tags.epc
                                }),

                            db(c)
                                .insert(packet_tags)
                                .values({
                                    epc: tag.epc,
                                    packetId: dbPackets[0].id
                                })
                                .onConflictDoNothing({
                                    target: [packet_tags.epc, packet_tags.packetId]
                                })
                        ]);
                    }
                    break;
                default:
                    break;
            }
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
