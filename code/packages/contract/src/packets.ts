import z from 'zod';
import { RFIDTagDataSchema } from './data';

export const PacketSchema = z.object({
    type: z.string(),
    timestamp: z.iso.datetime(),
    counter: z.number().nonnegative()
});

/**
 * Update the location of an edge device
 */
export const GpsUpdatePacketSchema = PacketSchema.extend({
    type: z.literal('GPS_UPDATE'),
    coordinates: z.object({
        latitude: z.number(),
        longitude: z.number()
    }),
    accuracy: z.number().optional(),
    heading: z.number().optional(),
    speed: z.number().optional()
});

/**
 * Used for generic system error messages on the edge device
 */
export const ErrorMessagePacketSchema = PacketSchema.extend({
    type: z.literal('ERROR_MESSAGE'),
    message: z.string()
});

/**
 * Used for sending changes in rfid tag presence
 */
export const RFIDTagEventPacketSchema = PacketSchema.extend({
    type: z.literal('RFID_TAG_EVENT'),
    tag: RFIDTagDataSchema,
    event: z.enum(['ADDED', 'REMOVED'])
});

/**
 * At regular intervals, a snapshot is stored as a baseline for all upcoming events.
 */
export const RFIDTagSnapshotSchema = PacketSchema.extend({
    type: z.literal('RFID_TAG_SNAPSHOT'),
    tags: z.array(RFIDTagDataSchema)
});

export const PacketSchemas = z.union([
    GpsUpdatePacketSchema,
    RFIDTagEventPacketSchema,
    RFIDTagSnapshotSchema,
    ErrorMessagePacketSchema
]);

export const PayloadSchema = z.object({
    packets: z.array(PacketSchemas)
});
