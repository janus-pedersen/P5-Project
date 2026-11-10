import { defineRelations } from 'drizzle-orm';
import { packets } from './schema/packet.js';
import { devices } from './schema/device.js';
import { packet_tags } from './schema/packet_tag.js';
import { tags } from './schema/tag.js';
import { tools } from './schema/tool.js';

export const relations = defineRelations({ devices, packets, packet_tags, tags, tools }, r => ({
    packets: {
        device: r.one.devices({
            from: r.packets.deviceCn,
            to: r.devices.cn
        }),
        packet_tags: r.many.packet_tags()
    },
    devices: {
        packets: r.many.packets()
    },
    packet_tags: {
        packet: r.one.packets({
            from: r.packet_tags.packetId,
            to: r.packets.id
        }),
        tag: r.one.tags({
            from: r.packet_tags.epc,
            to: r.tags.epc
        })
    },
    tags: {
        packet_tags: r.many.packet_tags(),
        tool: r.one.tools({
            from: r.tags.epc,
            to: r.tools.epc
        })
    },
    tools: {
        tag: r.one.tags({
            from: r.tools.epc,
            to: r.tags.epc
        })
    }
}));
