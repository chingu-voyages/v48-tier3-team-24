import { z } from 'zod';
import { EventStatusSchema } from '../inputTypeSchemas/EventStatusSchema'

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  status: EventStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  image: z.string(),
  price: z.number(),
  maxParticipants: z.number().int().nullable(),
  inviteLink: z.string().nullable(),
  streetAddress: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  isPrivate: z.boolean(),
  isFree: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
})

export type Event = z.infer<typeof EventSchema>

export default EventSchema;
