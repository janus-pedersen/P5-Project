import z from "zod";
import { PacketSchemas } from "./packets";

export const RFIDTagDataSchema = z.object({
    /** Electronic Product Code */
    epc: z.string()
        .trim()
        .toUpperCase()
        .regex(/^(?:[0-9A-F]{4})+$/, "Invalid EPC format"),
    rssi: z.number().negative()
})

export const SynchUpdateSchema = z.object({
    packets: z.array(PacketSchemas)
})
