import React, { useState } from "react";
import { api } from "~/utils/api";
import UpcomingEventTile from "./UpcomingEventTile";

const UpcomingEvents = () => {
  const upcomingEventsQuery = api.event.getUpcomingEvents.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // pagination: store the page cursor
  const [pageCursor, setPageCursor] = useState(0)
  

  // these handle functions would eventually reroute to different pages
  const handleOnClickDetailsEvent = (eventId: string) => {
    alert(`details: ${eventId}`);
  };

  const handleOnClickBookmarkEvent = (eventId: string) => {
    alert(`bookmark: ${eventId}`);
  };

  if (upcomingEventsQuery.isLoading && !upcomingEventsQuery.data) {
    return <div>Loading...Please wait</div>;
  }

  if (!upcomingEventsQuery.data) {
    return <div>Error loading upcoming events</div>;
  }

  return (
    <div className="flex basis-2/3 flex-col grow">
      <div className="mb-4 border-b-2 border-gray-300 pb-2">
        <span className="text-3xl font-bold">Upcoming Events near you</span>
      </div>
      <div>
        {upcomingEventsQuery.data.map((event, index) => {
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
    </div>
  );
};

export default UpcomingEvents;
