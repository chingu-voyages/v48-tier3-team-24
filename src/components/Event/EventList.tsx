import { Event } from "@prisma/client";
import EventListItem from "./EventItem";

interface EventListProps {
  events: Array<Event>;
}

export const EventList = (props: EventListProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-5 p-20 sm:p-10">
        {props.events.map((event) => {
          return <>{/* <EventListItem /> */}</>;
        })}
      </div>
    </>
  );
};
