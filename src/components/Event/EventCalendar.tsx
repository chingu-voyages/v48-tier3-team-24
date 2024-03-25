import React from "react";
import Calendar from "react-calendar";
import { EventsWithDatesAndPrivacy } from "~/pages/dash";

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
      const matchingEventDate = props.enabledDays.find(
        (eventDate) =>
          eventDate.startDateTime.getFullYear() === date.getFullYear() &&
          eventDate.startDateTime.getMonth() === date.getMonth() &&
          eventDate.startDateTime.getDate() === date.getDate(),
      );
      if (matchingEventDate && matchingEventDate.isPrivate) {
        return (
          <span className="text-es-secondary absolute inset-x-0 bottom-0 text-3xl">
            &bull;
          </span>
        );
      }
      else if ( matchingEventDate ){
        return (
          <span className="text-es-warning absolute inset-x-0 bottom-0 text-3xl">
            &bull;
          </span>
        );
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
