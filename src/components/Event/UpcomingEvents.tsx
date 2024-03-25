import React, { useState } from "react";
import UpcomingEventTile from "./UpcomingEventTile";
import type { EventUpcomingType } from "schemas";
import Spinner from "../Spinner";
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
        <PaginationControl
          index={eventIndex}
          step={step}
          total={numberOfEvents}
          style={buttonStyles}
          first={setIndexBeginning}
          next={moveIndexForward}
          prev={moveIndexBack}
          last={setIndexEnd}
        />
      )}
    </div>
  );
};

interface PaginationControlProps {
  index: number;
  step: number;
  total: number;
  style: (predicate: boolean) => string;
  first: () => void;
  next: () => void;
  prev: () => void;
  last: () => void;
}

const PaginationControl = ({
  index,
  step,
  total,
  style,
  first,
  next,
  prev,
  last,
}: PaginationControlProps) => (
  <div className="my-8 flex justify-center gap-4 border-t-2 border-gray-300 pt-4">
    <button className={style(index === 0)} onClick={() => first()}>
      <GrRewind />
    </button>
    <button className={style(index < step)} onClick={() => prev()}>
      <GrPrevious />
    </button>
    <span className="my-auto text-xl">
      {index + 1}
      {index + step < total ? ` ... ${index + step}` : ""}
      {` of ${total}`}
    </span>
    <button className={style(index + step > total)} onClick={() => next()}>
      <GrNext />
    </button>
    <button className={style(index >= total - 1)} onClick={() => last()}>
      <GrFastForward />
    </button>
  </div>
);

export default UpcomingEvents;
