import {
  Prisma,
  type Event,
  type EventStatus,
  type User,
} from "@prisma/client";
import type { StaticImageData } from "next/image";
import type { MouseEventHandler } from "react";

import Image from "next/image";
import { CiCalendarDate, CiBookmarkCheck } from "react-icons/ci";
import { HiOutlineTicket } from "react-icons/hi2";
import { RiGhostSmileLine } from "react-icons/ri";
import { EventItemStatus } from "./EventItemStatus";

export interface EventItemType {
  id: number;
  name: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  image?: StaticImageData;
  price?: number;
  maxParticipants?: number;
  inviteLink?: string;
  address?: string;
  lat?: number;
  lng?: number;
  status: EventStatus;
  isPrivate: boolean;
  isFree: boolean;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: User;
  eventParticipants: User[];
}

const eventWithParticipants = Prisma.validator<Prisma.EventDefaultArgs>()({
  include: { eventParticipants: true, createdBy: true },
});
export type EventWithParticipants = Prisma.EventGetPayload<
  typeof eventWithParticipants
>;

export interface EventItemProps {
  event: EventWithParticipants | EventItemType;
  onClick?: MouseEventHandler;
}

const EventItem = (props: EventItemProps) => {
  return (
    <div
      className="cursor-pointer rounded-lg border shadow-md hover:shadow-xl"
      onClick={props.onClick}
    >
      {props.event.image && (
        <Image
          className="rounded-t-lg"
          src={props.event.image}
          alt="Event Image"
        />
      )}
      <div className="p-5 md:p-6 lg:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-1">
            <div className="h-10 w-10 rounded-full border bg-black">
              <div className="mt-2 text-center text-white">
                +{props.event.eventParticipants.length}
              </div>
            </div>
            <div className="self-center text-center">Participants</div>
          </div>
          <div>
            <EventItemStatus status={props.event.status} />
          </div>
        </div>
        <h1 className="mb-2 text-xl font-bold">{props.event.name}</h1>
        <h1 className="font-sm mb-5 truncate text-gray-600">
          {props.event.description}
        </h1>
        <div className="mb-1 flex items-center">
          <RiGhostSmileLine />
          <p className="ml-2">
            {props.event.createdBy?.username ?? "ghost of christmas past"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="mb-1 flex items-center">
            <CiCalendarDate />
            <p className="ml-2">{props.event.startDateTime.toLocaleString()}</p>
          </div>
          <p>-</p>
          <div className="mb-1 flex items-center">
            <CiCalendarDate />
            <p className="ml-2">{props.event.startDateTime.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          <div className="flex items-center text-gray-500">
            <CiBookmarkCheck />
            <p className="ml-2">
              {props.event.eventParticipants.length} joined
            </p>
          </div>
          <div className="flex items-center text-gray-500">
            <HiOutlineTicket />
            {props.event.isFree ? (
              <p className="ml-2">Free</p>
            ) : (
              <p className="ml-2">${props.event.price}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
