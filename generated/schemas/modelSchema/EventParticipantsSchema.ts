import { z } from 'zod';

/////////////////////////////////////////
// EVENT PARTICIPANTS SCHEMA
/////////////////////////////////////////

export const EventParticipantsSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  eventId: z.string(),
  createdAt: z.coerce.date(),
})

export type EventParticipants = z.infer<typeof EventParticipantsSchema>

export default EventParticipantsSchema;
