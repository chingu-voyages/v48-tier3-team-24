import React, { useState } from "react";
import { api } from "~/utils/api";
import UpcomingEventTile from "./UpcomingEventTile";

const UpcomingEvents = () => {
  const upcomingEventsQuery =
    api.event.getUpcomingEvents.useQuery(undefined, {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

    const handleOnClickDetailsEvent = (eventId: string) => {
        alert(`details: ${eventId}`)
    }

    const handleOnClickBookmarkEvent = (eventId: string) => {
        alert(`bookmark: ${eventId}`)
    }

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
        <div className="border-b-2 border-gray-300 pb-2 mb-10">
          <span className="text-3xl font-bold">Upcoming Events</span>
        </div>
      );
    } else {
      divider = <div className="border-b-2 border-gray-200 my-10"></div>;
    }

    return (
      <div key={event.id}>
        {divider}
        <UpcomingEventTile
          data={event}
          handleOnClickDetails={handleOnClickDetailsEvent}
          handleOnClickBookmark={handleOnClickBookmarkEvent}
        />
      </div>
    );
  });
};

export default UpcomingEvents;
