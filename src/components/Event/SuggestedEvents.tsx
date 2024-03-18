import React, { ComponentProps } from "react";
import Button from "../Button";
import type { EventItemType, EventWithParticipants } from "./EventItem";
import { EventList } from "./EventList";
import { Event } from "@prisma/client";

interface SuggestedEventsProps {
  title: string;
  events?: EventItemType[] | EventWithParticipants[] | null;
}

const SuggestedEvents = ({ title, events }: SuggestedEventsProps) => {
  return (
    <>
      <div className="align-center inline-flex h-12 w-full items-end justify-between border-b-2 border-black text-2xl pb-4">
        <span className="md:w-3/4 lg:w-5/6 pl-5">{title}</span>
        {/* button would be dynamic eventually. If the # of events is <= 2, button won't render. */}
        <span className="md:w-1/4 lg:w-1/6">
          <Button variant="primary">View All</Button>
        </span>
      </div>
      <EventList events={events} />
      <div className="border-b-2 border-black"></div>
    </>
  );
};

export default SuggestedEvents;
