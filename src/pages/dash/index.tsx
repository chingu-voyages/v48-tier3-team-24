import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { demoStatusData } from "~/utils/demo_data";
import { api } from "~/utils/api";
import EventCalendar from "~/components/Event/EventCalendar";
import Header from "~/components/Header";
import Button from "~/components/Button";
import { FaPlus } from "react-icons/fa6";
import SuggestedEvents from "~/components/Event/SuggestedEvents";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

function UserDash() {
  const { data: sessionData } = useSession();

  const { data: hostedData, isLoading: hostedLoading } =
    api.event.getAllHostedEvents.useQuery(undefined, {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });
  const { data: attendingData, isLoading: attendingLoading } =
    api.event.getAllAttendingEvents.useQuery(undefined, {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  const [selectedDate, selectedDateOnChange] = useState<Value>(new Date());

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  const events1 = demoStatusData.slice(0, 1);
  const events2 = demoStatusData.slice(1, 3);

  if (hostedLoading || attendingLoading) {
    return <div>Loading...</div>;
  }

  // get the (Discord) name of the user otherwise use their username.
  const name = sessionData.user.name ?? sessionData.user.username;

  return (
    <>
      <Header />
      <div className="mx-10 flex flex-col lg:flex-row">
        <div className="flex basis-1/3 flex-col gap-8 py-10 sm:px-20">
          <p className="text-4xl font-bold">Hello {name},</p>
          <p className="text-2xl italic">
            Find or Host an Event <br /> and Connect with Others
          </p>
          <Button variant="primary" icon={<FaPlus />} width="full">
            Host a new Event
          </Button>
          <p className="text-4xl font-bold"></p>
          <span className="self-center mb-5">
            <EventCalendar onChange={selectedDateOnChange} />
          </span>
          <Button outline="info">Events I'm hosting</Button>
          <Button outline="info">Events I'm attending</Button>
        </div>
        <div className="flex basis-2/3 flex-col py-10">
          <SuggestedEvents title="Sugguested events" events={events2} />
        </div>
      </div>
    </>
  );
}

export default UserDash;
