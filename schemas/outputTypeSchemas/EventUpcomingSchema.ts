import { z } from "zod";

export const SingleUpcomingEventSchema = z.object({
  id: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  name: z.string(),
  description: z.string(),
  image: z.string().default(""),
  isPrivate: z.boolean(),
  city: z.string().nullish(),
  state: z.string().nullish(),
});

export const EventUpcomingSchema = z.array(SingleUpcomingEventSchema);

export type EventUpcomingType = z.infer<typeof EventUpcomingSchema>;

export type SingleUpcomingEventType = z.infer<
  typeof SingleUpcomingEventSchema
>;
