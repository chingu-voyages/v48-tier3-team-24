import { useSession } from "next-auth/react";
import React from "react";
import EventCalendar from "~/components/Event/EventCalendar";
import Header from "~/components/Header";
import Button from "~/components/Button";
import { FaPlus } from "react-icons/fa6";
import UpcomingEvents from "~/components/Event/UpcomingEvents";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import moment from "moment";
import type { SingleUpcomingEventType } from "schemas";

export type EventsWithDatesAndPrivacy = {
  startDateTime: Date;
  endDateTime: Date;
  isPrivate: boolean;
};

function UserDash() {
  let enabledCalendarDays: EventsWithDatesAndPrivacy[] = [];
  const { data: sessionData } = useSession();
  const router = useRouter();

  // pull out the bare minimum from the return object
  const {
    data: upcomingEvents,
    isLoading: eventsIsLoading,
    isError: eventsHasError,
  } = api.event.getUpcomingEvents.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const handleHostNewEvent = () => {
    return router.push("/dash/new");
  };

  // if the user clicks on a day, open a popup to pick the event on that date
  const handleOnClickedDay = (clickedDate: Date) => {
    const clickedMoment = moment(clickedDate);
    if (upcomingEvents) {
      const clickedEvents = upcomingEvents.filter(
        (event) =>
          clickedMoment.isSameOrAfter(event.startDateTime, "days") &&
          clickedMoment.isSameOrBefore(event.endDateTime, "days"),
      );
      // pass the the event id to either the event details page or a modal displaying all evnets on that date
      if (clickedEvents?.length === 1) {
        alert(clickedEvents.at(0)?.id);
      } else {
        const eventIdsOnDate = clickedEvents.map((event) => event.id);
        alert(`ids on this date: ${eventIdsOnDate.toString()}`);
      }
    }
  };

  if (upcomingEvents && !eventsIsLoading && !eventsHasError) {
    // get the dates from any and all events returned
    enabledCalendarDays = upcomingEvents.map(
      (event: SingleUpcomingEventType): EventsWithDatesAndPrivacy => {
        return {
          startDateTime: event.startDateTime,
          endDateTime: event.endDateTime,
          isPrivate: event.isPrivate,
        };
      },
    );
  }

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  // get the (Discord) name of the user otherwise use their username.
  const name = sessionData.user.name ?? sessionData.user.username;

  return (
    <>
      <Header />
      <div className="mx-10 flex flex-col lg:flex-row">
        <div className="mb-16 flex basis-1/3 flex-col gap-4 sm:px-12">
          <p className="text-4xl font-bold">Hello {name},</p>
          <p className="text-2xl italic">
            Find or Host an Event and Connect with Others
          </p>
          <Button
            variant="primary"
            icon={<FaPlus />}
            width="full"
            onClick={handleHostNewEvent}
          >
            Host a new Event
          </Button>
          <p className="text-4xl font-bold"></p>
          <span className="mb-5 self-center">
            <EventCalendar
              onChange={handleOnClickedDay}
              enabledDays={enabledCalendarDays}
            />
          </span>
          <Button outline="info">Events I&apos;m hosting</Button>
          <Button outline="info">Events I&apos;m attending</Button>
        </div>
        <UpcomingEvents
          data={upcomingEvents}
          isLoading={eventsIsLoading}
          isError={eventsHasError}
        />
      </div>
    </>
  );
}

export default UserDash;
