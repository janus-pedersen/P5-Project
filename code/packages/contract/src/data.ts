import z from 'zod';
import { PacketSchemas } from './packets';

export const RFIDTagDataSchema = z.object({
    /** Electronic Product Code */
    epc: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^(?:[0-9A-F]{4})+$/, 'Invalid EPC format'),
    rssi: z.number().negative()
});

/**
 * The actual payload to be sent in the POST request to the server
 */
export const SyncUpdateSchema = z.object({
    packets: z.array(PacketSchemas)
});
