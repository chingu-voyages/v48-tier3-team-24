import { MdEventAvailable } from "react-icons/md";

const EventAddButton = ({onClick}:{onClick:()=>void}) => {
  return (
    <button type="button" onClick={onClick} className="w-full sm:w-3/5 lg:w-2/5 flex flex-row self-center justify-center gap-3 px-3 py-1 bg-es-primary text-white rounded hover:bg-es-primary-light cursor-pointer">
      <MdEventAvailable className="text-2xl" />
      <span>Add Event</span>
    </button>
  );
};

export default EventAddButton;