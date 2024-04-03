import React from "react";
import Modal from "../Modal";
import { type CalendarEventsType } from "schemas";
import IconTooltip from "../IconTooltip";
import { AiOutlineClose } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

const CalendarEventPicker = ({
  events,
  toggle,
  handleEventSelected,
  handleEventCancel,
}: {
  events: CalendarEventsType | undefined;
  toggle: boolean;
  handleEventSelected: (id: string) => void;
  handleEventCancel: () => void;
}) => {
  return (
    <Modal modalOpen={toggle}>
      <div className="my-2 flex items-center justify-between border-b-4 px-4 py-2">
        <span className="text-xl">Events on this day</span>
        <IconTooltip tooltip="Close" position="left">
          <AiOutlineClose className="mx-2" size={30} onClick={handleEventCancel}/>
        </IconTooltip>
      </div>
      <div className="flex flex-col">
        {events?.events.map((event) => (
            <div key={event.id} className="flex p-4 justify-between">
              <div className="w-1/2 divide-y-2">
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="line-clamp-1">{event.description}</p>
              </div>
              <IconTooltip tooltip="Details" position="left">
                <MdNavigateNext size={40} onClick={() => handleEventSelected(event.id)}/>
              </IconTooltip>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default CalendarEventPicker;
