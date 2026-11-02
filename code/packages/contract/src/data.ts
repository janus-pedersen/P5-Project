import z from 'zod';

export const RFIDTagDataSchema = z.object({
    /** Electronic Product Code */
    epc: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^(?:[0-9A-F]{4})+$/, 'Invalid EPC format'),
    rssi: z.number().negative()
});
