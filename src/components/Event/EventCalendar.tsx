import React, { type Dispatch, type SetStateAction } from "react";
import Calendar from "react-calendar";
import { type Value } from "~/pages/dash";
// import 'react-calendar/dist/Calendar.css';

interface EventCalendarProps {
    onChange: Dispatch<SetStateAction<Value>>
}

const EventCalendar = (props: EventCalendarProps) => {
  return <Calendar onChange={props.onChange} minDetail="year" className="rounded-lg"/>;
};

export default EventCalendar;
