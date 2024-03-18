import React, { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";
import { Value } from "~/pages/dash";
import 'react-calendar/dist/Calendar.css';

interface EventCalendarProps {
    onChange: Dispatch<SetStateAction<Value>>
}

const EventCalendar = (props: EventCalendarProps) => {
  return <Calendar onChange={props.onChange}/>;
};

export default EventCalendar;
