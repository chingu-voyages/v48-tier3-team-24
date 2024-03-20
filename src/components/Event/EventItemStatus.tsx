import type { EventStatus } from "@prisma/client";
import { MdOutlinePublic } from "react-icons/md";

interface EventItemStatusProps {
  status: EventStatus;
}

export const EventItemStatus = (props: EventItemStatusProps) => {
  let bgColor = "rounded-lg px-5 py-2 text-sm text-white ";

  switch (props.status) {
    case "UPCOMING":
      bgColor += "bg-yellow-600";
      break;
    case "CANCELED":
      bgColor += "bg-red-600";
      break;
    case "COMPLETED":
      bgColor += "bg-green-600";
      break;
    case "IN_PROGRESS":
      bgColor += "bg-blue-600";
      break;
  }

  return (
    <div className={bgColor}>
      <div className="flex items-center">
        <MdOutlinePublic />
        <p className="ml-2">{props.status}</p>
      </div>
    </div>
  );
};
