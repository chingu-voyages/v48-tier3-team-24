import { Event } from "@prisma/client";
import EventListItem from "./EventItem";
import type { EventItemType, EventWithParticipants } from "./EventItem";

interface EventListProps {
  events?: EventItemType[] | EventWithParticipants[] | null;
}

export const EventList = (props: EventListProps) => {
  return (
    <div className="grid gap-5 p-12 md:p-5 md:grid-cols-1 lg:grid-cols-2">
      {props.events?.map((event) => {
        return <EventListItem event={event} key={event.id}/>;
      })}
    </div>
  );
};
