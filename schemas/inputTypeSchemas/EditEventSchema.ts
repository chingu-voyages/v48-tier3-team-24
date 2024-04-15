import { z } from 'zod';
import { EventStatusSchema } from 'generated/schemas';

export const EditEventSchema = z.object({
  id: z.string().min(1),
  status: EventStatusSchema.default("UPCOMING"),
  name: z.string().default(""),
  description: z.string().default(""),
  startDateTime: z.coerce.date().default(new Date()),
  endDateTime: z.coerce.date().default(new Date()),
  image: z.string().default(""),
  price: z.string().default("0"),
  maxParticipants: z.number().default(0),
  inviteLink: z.string().nullable().default(null),
  streetAddress: z.string().nullable().default(null),
  city: z.string().nullable().default(null),
  state: z.string().nullable().default(null),
  zip: z.string().nullable().default(null),
  lat: z.number().nullable().default(null),
  lng: z.number().nullable().default(null),
  isPrivate: z.boolean().default(false),
  isFree: z.boolean().default(false),
})

export type ExistingEvent = z.infer<typeof EditEventSchema>
