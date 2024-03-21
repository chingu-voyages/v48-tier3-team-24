import React from "react";
import Image from "next/image";
import moment from "moment";
import type { SingleUpcomingEventType } from "schemas";
import { CiBookmark, CiImageOff, CiSaveUp2 } from "react-icons/ci";

interface UpcomingEventTileProps {
  data: SingleUpcomingEventType;
  handleOnClickDetails: (eventId: string) => void;
  handleOnClickBookmark: (eventId: string) => void;
}

const UpcomingEventTile = ({
  data,
  handleOnClickDetails,
  handleOnClickBookmark,
}: UpcomingEventTileProps) => {
  let location;

  if (!data.city && !data.state) {
    location = "Online";
  } else {
    location = `${data.city}, ${data.state}`;
  }

  return (
    <div className="flex flex-row p-2">
      <div className="container flex basis-1/5">
        {data.image ? (
          <Image
            className="w-full rounded-lg"
            width={150}
            height={150}
            src={data.image}
            alt="Event Image"
          />
        ) : (
          <CiImageOff
            className="flex grow place-self-center text-gray-400"
            size={40}
          />
        )}
      </div>
      <div className="ml-16 flex basis-4/5 flex-col justify-between">
        <p className="font-slate-100 text-xl">
          {moment(data.startDateTime)
            .format("ddd, MMMM D [\u2022] h:mm a")
            .toUpperCase()}
        </p>
        <p className="text-xl font-bold">{data.name}</p>
        <p className="text-l">
          {data.description} &bull; {location}
        </p>
        <div className="flex flex-row justify-between">
          {data.isPrivate ? (
            <div className="bg-es-secondary-light-100 max-h-7 rounded-lg px-8">
              <span className="text-xl font-bold text-es-secondary">
                Private Event
              </span>
            </div>
          ) : (
            <div className="bg-es-warning-light-100 max-h-7 rounded-lg px-6">
              <span className="text-xl font-bold text-es-warning">
                Public Event
              </span>
            </div>
          )}
          <div className="mr-10 flex flex-row gap-4">
            <CiSaveUp2
              className="cursor-pointer hover:shadow-lg"
              size={40}
              onClick={() => handleOnClickDetails(data.id)}
            />
            <CiBookmark
              className="cursor-pointer hover:shadow-lg"
              size={40}
              onClick={() => handleOnClickBookmark(data.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventTile;
