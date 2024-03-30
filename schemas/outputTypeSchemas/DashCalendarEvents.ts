import { z } from "zod";

export const CalendarEventSchema = z.object({
  id: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  isPrivate: z.boolean(),
});

export const CalendarEventsSchema = z
  .object({
    events: z.array(CalendarEventSchema),
  })
  .nullable();

export type CalendarEventsType = z.infer<typeof CalendarEventsSchema>;

export type CalendarEventType = z.infer<typeof CalendarEventSchema>;
