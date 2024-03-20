import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { SingleUpcomingEventType } from "schemas";
import { CiBookmark, CiSaveUp2 } from "react-icons/ci";

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
    <div
      className="flex flex-row p-2"
    >
      <div className="basis-1/5">
        {data.image && (
          <Image
            className="w-full rounded-lg"
            width={150}
            height={150}
            src={data.image}
            alt="Event Image"
          />
        )}
      </div>
      <div className="ml-16 flex basis-4/5 flex-col justify-between">
        <p className="font-slate-100 text-xl">
          {formatDateTime(data.startDateTime)}
        </p>
        <p className="text-xl font-bold">{data.name}</p>
        <p className="text-l">
          {data.description} &bull; {location}
        </p>
        <div className="flex flex-row justify-between">
          {data.isPrivate ? (
            <div className="bg-es-secondary-light-100 rounded-sm px-8 py-2">
              <span className="text-es-secondary">Private Event</span>
            </div>
          ) : (
            <div className="bg-es-warning-light-100 rounded-lg px-8 py-2">
              <span className="text-es-warning">Public Event</span>
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

const formatDateTime = (dt: Date) => {
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthsOfTheYear.at(dt.getMonth());
  const date = dt.getDate();
  const day = daysOfTheWeek.at(dt.getDay());
  const now = new Date(Date.now());

  let year = 0;
  let hour = dt.getHours();
  let minutes: number | string = dt.getMinutes();
  let timeSuffix = "AM";

  if (hour >= 12) {
    hour = hour - 12;
    timeSuffix = "PM";
  }

  if (minutes === 0) {
    minutes = "00";
  }

  if (dt.getFullYear() > now.getFullYear()) {
    year = dt.getFullYear();
  }

  return `${day}, ${month} ${date} - ${hour}:${minutes} ${timeSuffix}`;
};

export default UpcomingEventTile;
