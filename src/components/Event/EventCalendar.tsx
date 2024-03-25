import React from "react";
import Calendar from "react-calendar";
import type { EventsWithDatesAndPrivacy } from "~/pages/dash";

interface EventCalendarProps {
  onChange: (clickedDate: Date) => void;
  enabledDays: EventsWithDatesAndPrivacy[];
}

const EventCalendar = (props: EventCalendarProps) => {
  const tileDisabled = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    return (
      view === "month" &&
      !props.enabledDays.find(
        (eventDate) =>
          eventDate.startDateTime.getFullYear() === date.getFullYear() &&
          eventDate.startDateTime.getMonth() === date.getMonth() &&
          eventDate.startDateTime.getDate() === date.getDate(),
      )
    );
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const eventsOnDate = props.enabledDays.filter(
        (eventDate) =>
          eventDate.startDateTime.getFullYear() === date.getFullYear() &&
          eventDate.startDateTime.getMonth() === date.getMonth() &&
          eventDate.startDateTime.getDate() === date.getDate(),
      );
      if (eventsOnDate) {
        let bullets: React.JSX.Element[] = [];
        eventsOnDate.map((event) => {
          if (event.isPrivate) {
            bullets.push(
              <span className="text-3xl text-es-secondary">&bull;</span>,
            );
          } else {
            bullets.push(
              <span className="text-3xl text-es-warning">&bull;</span>,
            );
          }
        });
        return <div className="absolute inset-x-0 bottom-0">{bullets}</div>;
      }
    }
  };

  const onClickDay = (value: Date) => {
    props.onChange(value);
  };

  return (
    <Calendar
      minDetail="year"
      className="rounded-lg"
      tileDisabled={tileDisabled}
      tileContent={tileContent}
      onClickDay={onClickDay}
    />
  );
};

export default EventCalendar;
