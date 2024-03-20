import { z } from 'zod';

export const EventStatusSchema = z.enum(['UPCOMING','IN_PROGRESS','COMPLETED','CANCELED']);

export type EventStatusType = `${z.infer<typeof EventStatusSchema>}`

export default EventStatusSchema;
