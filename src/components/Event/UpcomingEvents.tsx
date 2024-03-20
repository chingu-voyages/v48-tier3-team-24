import React from "react";
import { api } from "~/utils/api";
import UpcomingEventTile from "./UpcomingEventTile";

const UpcomingEvents = () => {
  const upcomingEventsQuery =
    api.event.getUpcomingEvents.useQuery(undefined, {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  if (upcomingEventsQuery.isLoading && !upcomingEventsQuery.data) {
    return <div>Loading...Please wait</div>;
  }

  if (!upcomingEventsQuery.data) {
    return <div>No Upcoming Events</div>;
  }

  return upcomingEventsQuery.data.map((event, index) => {
    let divider;

    if (index === 0) {
      divider = (
        <div className="border-b-2 border-gray-300 pb-2 mb-10" key={index}>
          <span className="text-3xl font-bold">Upcoming Events</span>
        </div>
      );
    } else {
      divider = <div className="border-b-2 border-gray-200 py-10" key={index}></div>;
    }

    return (
      <>
        {divider}
        <UpcomingEventTile
          id={event.id}
          key={event.id}
          name={event.name}
          description={event.description}
          startDateTime={event.startDateTime}
          image={event.image}
          isPrivate={event.isPrivate}
        />
      </>
    );
  });
};

export default UpcomingEvents;
