import { Event, EventParticipants, EventStatus, User } from "@prisma/client";
import { EventList } from "./EventList";
import Image from "next/image";
import { CiCalendarDate, CiBookmarkCheck } from "react-icons/ci";
import { HiOutlineTicket } from "react-icons/hi2";
import { MdOutlinePublic } from "react-icons/md";
import { RiGhostSmileLine } from "react-icons/ri";
import { MouseEventHandler } from "react";
import { EventItemStatus } from "./EventItemStatus";

export interface iEventItem {
  id: number;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  image?: string;
  price?: number;
  maxParticipants?: number;
  inviteLink?: string;
  address: string;
  lat?: number;
  lng?: number;
  status: EventStatus;
  isPrivate: boolean;
  isFree: boolean;
  createdAt: string;
  updatedAt?: string;
  host: User;
  eventParticipants: User[];
}

export interface iEvent {
  event: iEventItem;
  onClick?: MouseEventHandler;
}

const EventItem = (props: iEvent) => {
  return (
    <>
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
              <div className="h-10 w-10 rounded-full border bg-black text-white">
                <p className="mt-2 text-center">
                  +{props.event.eventParticipants.length}
                </p>
              </div>
              {props.event.eventParticipants.map((participants) => {
                return (
                  <>
                    <div className="h-10 w-10 rounded-full border">
                      <p className="mt-2 text-center first-letter:capitalize">
                        {participants.username?.charAt(0)}
                      </p>
                    </div>
                  </>
                );
              })}
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
            <p className="ml-2">{props.event.host.username}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="mb-1 flex items-center">
              <CiCalendarDate />
              <p className="ml-2">{props.event.startDateTime}</p>
            </div>
            <p>-</p>
            <div className="mb-1 flex items-center">
              <CiCalendarDate />
              <p className="ml-2">{props.event.startDateTime}</p>
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
    </>
  );
};

export default EventItem;
