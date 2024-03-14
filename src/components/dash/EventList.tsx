import React, { ReactNode } from "react";

export type EventsType = {
  id: number;
  name: string;
  description: string;
  image?: string | undefined;
  type: "virtual" | "in_person";
};

interface EventListProps {
  events?: EventsType[];
  title: string;
}

interface EventContainerProps {
  title: string;
  children?: ReactNode;
}

const EventContainer = ({ title, children }: EventContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="container border-solid border-black">
        <div className="mb-4 text-2xl">{title}</div>
        {children}
      </div>
    </div>
  );
};

const EventList = (props: EventListProps) => {
  if (!props.events) {
    return (
      <EventContainer title={props.title}>
        You are not registered to attend any upcoming events.
      </EventContainer>
    );
  }

  // @TODO: limit events to 5 on screen. Keep track of which events are currently displayed.

  return (
    <EventContainer title={props.title}>
      <div className="flex flex-row gap-4">
        {props.events.map((event) => {
          return (
            <div
              className="container w-64 rounded-md border-2 border-solid border-black p-5"
              key={event.id}
            >
              {event.name}
              <br />
              {event.description}
              <br />
              {event.type}
            </div>
          );
        })}
      </div>
    </EventContainer>
  );
};

export default EventList;
