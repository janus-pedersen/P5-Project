import { defineRelations } from 'drizzle-orm';
import { packets } from './schema/packet.js';
import { devices } from './schema/device.js';

export const relations = defineRelations({ devices, packets }, r => ({
    packets: {
        device: r.one.devices({
            from: r.packets.deviceCn,
            to: r.devices.cn
        })
    },
    devices: {
        packets: r.many.packets()
    }
}));
