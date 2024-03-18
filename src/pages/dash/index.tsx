import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import EventContainer from "~/components/Event/SuggestedEvents";
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
    api.event.getAllHostedEvents.useQuery();
  const { data: attendingData, isLoading: attendingLoading } =
    api.event.getAllAttendingEvents.useQuery();

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
      <div className="flex lg:flex-row flex-col gap-10 mx-10">
        <div className="flex basis-1/3 flex-col gap-10 sm:px-20 py-10">
          <div className="">
            <p className="mb-5 text-4xl font-bold">Hello {name},</p>
            <p className="text-2xl italic">
              Find or Host an Event <br /> and Connect with Others
            </p>
          </div>
          <div className="w-3/4 self-center">
            <Button outline="primary" icon={<FaPlus />} width="full">
              Host a new Event
            </Button>
          </div>
          <div className="">
            <p className="mb-5 text-4xl font-bold"></p>
            <EventCalendar onChange={selectedDateOnChange} />
          </div>
        </div>
        <div className="flex basis-2/3 flex-col py-10">
          <SuggestedEvents title="Sugguested events" events={events2} />
        </div>
      </div>
    </>
  );
}

export default UserDash;
