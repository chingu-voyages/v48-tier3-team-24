import React from "react";
import Modal from "../Modal";
import { type EventUpcomingType } from "schemas";
import IconTooltip from "../IconTooltip";
import { AiOutlineClose } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

const CalendarEventPicker = ({
  events,
  toggle,
  handleEventSelected,
  handleEventCancel,
}: {
  events: EventUpcomingType | undefined;
  toggle: boolean;
  handleEventSelected: (id: string) => void;
  handleEventCancel: () => void;
}) => {
  return (
    <Modal modalOpen={toggle}>
      <div className="my-2 flex items-center justify-between gap-20 border-b-4 px-4 py-2">
        <span className="text-xl">Events on this day</span>
        <IconTooltip tooltip="Close" position="left">
          <AiOutlineClose size={30} onClick={handleEventCancel}/>
        </IconTooltip>
      </div>
      <div className="flex flex-col w-full">
        {events?.map((event) => (
            <div key={event.id} className="w-full flex p-4 gap-4 justify-between">
              <div className="flex flex-col grow divide-y-2">
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
