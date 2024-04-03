import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "~/components/Header";
import Button from "~/components/Button";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import moment from "moment";
import type { SingleUpcomingEventType } from "schemas";
import EventCalendar from "~/components/dash/EventCalendar";
import UpcomingEvents from "~/components/dash/UpcomingEvents";
import Link from "next/link";
import CalendarEventPicker from "~/components/dash/CalendarEventPicker";

export type EventsWithDatesAndPrivacy = {
  startDateTime: Date;
  endDateTime: Date;
  isPrivate: boolean;
};

function UserDash() {
  let enabledCalendarDays: EventsWithDatesAndPrivacy[] = [];
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [calendarPickerToggle, setCalendarPickerToggle] =
    useState<boolean>(false);

  // load the page's data
  const [
    {
      data: upcomingEvents,
      isLoading: eventsIsLoading,
      isError: eventsHasError,
    },
    { data: calendarEvents },
  ] = api.useQueries((t) => [
    t.dash.getUpcomingEvents(undefined, {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }),
    t.dash.getUsersEvents(undefined, {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }),
  ]);

  const handleHostNewEvent = () => {
    return router.push("/events/new");
  };

  // if the user clicks on a day, open a popup to pick the event on that date
  const handleOnClickedDay = (clickedDate: Date) => {
    const clickedMoment = moment(clickedDate);
    if (upcomingEvents) {
      // get the events on the clicked date
      const clickedEvents = upcomingEvents.filter(
        (event: SingleUpcomingEventType) =>
          clickedMoment.isSameOrAfter(event.startDateTime, "days") &&
          clickedMoment.isSameOrBefore(event.endDateTime, "days"),
      );

      if (!clickedEvents) return;

      // pass the the event id to either the event details page or a modal displaying all evnets on that date
      if (clickedEvents.length === 1) {
        // alert(clickedEvents.at(0)?.id);
        return router.push(`/events/${clickedEvents[0]!.id}`);
      } else {
        setCalendarPickerToggle(true);
      }
    }
  };

  const handleEventSelected = (id: string) => {
    setCalendarPickerToggle(false);
    router.push(`/events/${id}`);
  };

  const handleEventCancel = () => {
    setCalendarPickerToggle(false);
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
    return (
      <>
        Access denied.<Link href="/login">Go to login page.</Link>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="mx-10 flex flex-col lg:flex-row">
        <div className="mb-16 flex basis-1/3 flex-col gap-4 sm:px-12">
          <p className="text-4xl font-bold">
            Hello {sessionData.user.name ?? sessionData.user.username},
          </p>
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
      <CalendarEventPicker
        events={calendarEvents}
        toggle={calendarPickerToggle}
        handleEventSelected={handleEventSelected}
        handleEventCancel={handleEventCancel}
      />
    </>
  );
}

export default UserDash;
