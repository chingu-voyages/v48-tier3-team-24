import React from "react";
import Button from "../Button";
import type { EventItemType } from "./EventItem";
import { EventList } from "./EventList";

interface EventContainerProps {
  title: string;
  events: EventItemType[];
}

const EventContainer = ({ title, events }: EventContainerProps) => {
  return (
    <section className="container rounded-md border-2 border-black">
      <div className="align-center inline-flex h-12 w-full items-center justify-between rounded-md bg-slate-300 text-2xl">
        <span className="md:w-3/4 lg:w-5/6 pl-5">{title}</span>
        <span className="md:w-1/4 lg:w-1/6">
          <Button variant="primary">View All</Button>
        </span>
      </div>

      <EventList events={events} />
    </section>
  );
};

export default EventContainer;
