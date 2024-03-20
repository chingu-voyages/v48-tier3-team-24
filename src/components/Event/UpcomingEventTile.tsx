import React from "react";
import Image from "next/image";
import { SingleUpcomingEventType } from "schemas";

const UpcomingEventTile = (props: SingleUpcomingEventType) => {
  let location;

  if (!props.city && !props.state) {
    location = "Online";
  } else {
    location = `${props.city}, ${props.state}`;
  }

  return (
    <div className="flex cursor-pointer flex-row rounded-lg border shadow-md hover:shadow-xl p-2">
      <div className="basis-1/5">
        {props.image && (
          <Image
            className="w-full rounded-lg"
            width={150}
            height={150}
            src={props.image}
            alt="Event Image"
          />
        )}
      </div>
      <div className="flex basis-4/5 flex-col justify-between ml-16">
        <p className="font-slate-100 text-xl">
          {formatDateTime(props.startDateTime)}
        </p>
        <p className="text-xl font-bold">{props.name}</p>
        <p className="text-l">
          {props.description} &bull; {location}
        </p>
        <div className="flex flex-row justify-between">
          {props.isPrivate ? (
            <div className="bg-es-secondary-light-100 rounded-sm px-8 py-2">
              <span className="text-es-secondary">Private Event</span>
            </div>
          ) : (
            <div className="rounded-lg bg-es-warning-light-100 px-8 py-2">
              <span className="text-es-warning">Public Event</span>
            </div>
          )}
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

  const month = monthsOfTheYear.at(dt.getMonth() + 1);
  const date = dt.getDate();
  const day = daysOfTheWeek.at(dt.getDay());
  const now = new Date(Date.now());

  let year = 0;
  let hour = dt.getHours();
  let minutes: number | string = dt.getMinutes();
  let timeSuffix = "AM";

  if (hour > 12) {
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
