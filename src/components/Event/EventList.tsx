import EventListItem, { iEventItem } from "./EventItem";

interface EventListProps {
  events: Array<iEventItem>;
}

export const EventList = (props: EventListProps) => {
  return (
    <>
      <div className="md:10 lg:20 flex grid grid-cols-1 flex-wrap gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
        {props.events.map((event) => {
          return (
            <>
              <EventListItem event={event} />
            </>
          );
        })}
      </div>
    </>
  );
};
