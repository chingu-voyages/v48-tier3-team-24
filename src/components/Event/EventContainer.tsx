import React from "react";
import Button from "../Button";
import type { EventItemType, EventWithParticipants } from "./EventItem";
import { EventList } from "./EventList";
import { Event } from "@prisma/client";

interface EventContainerProps {
  title: string;
  events?: EventItemType[] | EventWithParticipants[] | null;
}

const EventContainer = ({ title, events }: EventContainerProps) => {
  return (
    <section className="container rounded-md border-2 border-black">
      <div className="align-center inline-flex h-12 w-full items-center justify-between rounded-md bg-slate-300 text-2xl">
        <span className="md:w-3/4 lg:w-5/6 pl-5">{title}</span>
        {/* button would be dynamic eventually. If the # of events is <= 2, button won't render. */}
        <span className="md:w-1/4 lg:w-1/6">
          <Button variant="primary">View All</Button>
        </span>
      </div>

      <EventList events={events} />
    </section>
  );
};

export default EventContainer;
