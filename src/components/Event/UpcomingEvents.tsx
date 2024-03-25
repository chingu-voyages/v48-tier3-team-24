import React, { useState } from "react";
import UpcomingEventTile from "./UpcomingEventTile";
import { EventUpcomingType } from "schemas";
import Spinner from "../Spinner";
import Button from "../Button";
import { GrNext, GrPrevious, GrRewind, GrFastForward } from "react-icons/gr";

interface UpcomingEventsProps {
  data: EventUpcomingType | undefined;
  isLoading: boolean;
  isError: boolean;
}

const UpcomingEvents = ({ data, isLoading, isError }: UpcomingEventsProps) => {
  // pagination: store the page cursor
  const [eventIndex, setEventIndex] = useState(0);
  const step = 3;
  const numberOfEvents = data?.length ?? 0;

  const moveIndexForward = () => {
    if (eventIndex + step >= numberOfEvents) {
      setEventIndex(numberOfEvents - 1);
    } else {
      setEventIndex((prevIndex) => prevIndex + step);
    }
  };

  const moveIndexBack = () => {
    if (eventIndex - step < step) {
      setEventIndex(0);
    } else {
      setEventIndex((prevIndex) => prevIndex - step);
    }
  };

  const setIndexBeginning = () => {
    setEventIndex(0);
  };

  const setIndexEnd = () => {
    setEventIndex(numberOfEvents - 1);
  };

  const buttonStyles = (isDisabled: boolean) => {
    const baseStyles = "w-8 text-2xl";
    if (isDisabled) {
      return baseStyles + " cursor-not-allowed text-gray-400";
    }
    return baseStyles;
  };

  // these handle functions would eventually reroute to different pages from the parent component
  const handleOnClickDetailsEvent = (eventId: string) => {
    alert(`details: ${eventId}`);
  };

  const handleOnClickBookmarkEvent = (eventId: string) => {
    alert(`bookmark: ${eventId}`);
  };

  if (isLoading && !data) {
    return <Spinner message="Loading...Please wait" />;
  }

  if (isError) {
    return <div>An error occurred while loading upcoming events</div>;
  }

  if (!data) {
    return <div>No upcoming events.</div>;
  }

  return (
    <div className="flex grow basis-2/3 flex-col">
      <div className="mb-4 border-b-2 border-gray-300 pb-2">
        <span className="text-3xl font-bold">Upcoming Events near you</span>
      </div>
      <div className="h-[36rem] lg:h-[38rem]">
        {data.slice(eventIndex, eventIndex + step).map((event, index) => {
          return (
            <div key={event.id}>
              {index !== 0 && (
                <div className="my-8 border-b-2 border-gray-200"></div>
              )}
              <UpcomingEventTile
                data={event}
                handleOnClickDetails={handleOnClickDetailsEvent}
                handleOnClickBookmark={handleOnClickBookmarkEvent}
              />
            </div>
          );
        })}
      </div>
      {numberOfEvents > step && (
        <div className="flex justify-center gap-4 my-8 border-t-2 border-gray-300 pt-4">
          <button className={buttonStyles(eventIndex === 0)} onClick={() => setIndexBeginning()}>
            <GrRewind />
          </button>
          <button className={buttonStyles(eventIndex < step)} onClick={() => moveIndexBack()}>
            <GrPrevious />
          </button>
          <span className="my-auto text-xl">
            {eventIndex + 1} ...{" "}
            {eventIndex + step > numberOfEvents
              ? numberOfEvents
              : eventIndex + step}{" "}
            of {numberOfEvents}
          </span>
          <button className={buttonStyles(eventIndex + step > numberOfEvents)} onClick={() => moveIndexForward()}>
            <GrNext />
          </button>
          <button className={buttonStyles(eventIndex >= numberOfEvents-1)} onClick={() => setIndexEnd()}>
            <GrFastForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
