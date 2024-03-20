import { z } from "zod";

export const EventUpcomingSchema = z.array(
  z.object({
    id: z.string(),
    startDateTime: z.date(),
    name: z.string(),
    description: z.string(),
    image: z.string().nullish(),
    isPrivate: z.boolean(),
    city: z.string().nullish(),
    state: z.string().nullish(),
  }),
);

export type EventUpcomingType = z.infer<typeof EventUpcomingSchema>;
