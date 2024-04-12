import React from "react";
import Button from "../Button";
import type { EventItemType, EventWithParticipants } from "./EventItem";
import { EventList } from "./EventList";

interface SuggestedEventsProps {
  title: string;
  events: EventItemType[] | EventWithParticipants[];
}

const SuggestedEvents = ({ title, events }: SuggestedEventsProps) => {
  return (
    <>
      <div className="align-center inline-flex h-12 w-full items-end justify-between border-b-2 border-black pb-4 text-2xl">
        <span className="pl-5 md:w-3/4 lg:w-5/6">{title}</span>
        {/* button would be dynamic eventually. If the # of events is <= 2, button won't render. */}
        {events.length > 2 ? (
          <Button variant="primary">View All ({events.length})</Button>
        ) : (
          ""
        )}
      </div>
      <EventList events={events} />
      <div className="border-b-2 border-black"></div>
    </>
  );
};

export default SuggestedEvents;
