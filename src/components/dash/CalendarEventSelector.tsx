import React, { useState } from "react";
import Modal from "../Modal";
import { CalendarEventsType } from "schemas";

const CalendarEventSelector = ({
  events,
  toggle,
}: {
  events: CalendarEventsType;
  toggle: boolean;
}) => {
  return (
    <Modal modalOpen={toggle}>
      {events!.events.map((event) => (
        <div></div>
      ))}
    </Modal>
  );
};

export default CalendarEventSelector;
