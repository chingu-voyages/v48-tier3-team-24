import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { demoStatusData } from "~/utils/demo_data";
import { api } from "~/utils/api";
import EventCalendar from "~/components/Event/EventCalendar";
import Header from "~/components/Header";
import Button from "~/components/Button";
import { FaPlus } from "react-icons/fa6";
import SuggestedEvents from "~/components/Event/SuggestedEvents";
import UpcomingEvents from "~/components/Event/UpcomingEvents";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

function UserDash() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleHostNewEvent = () => {
    return router.push("/dash/new")
  }

  // for calendar picker
  const [selectedDate, selectedDateOnChange] = useState<Value>(new Date());

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  // get the (Discord) name of the user otherwise use their username.
  const name = sessionData.user.name ?? sessionData.user.username;

  return (
    <>
      <Header />
      <div className="mx-10 flex flex-col lg:flex-row">
        <div className="flex basis-1/3 flex-row lg:flex-col gap-8 sm:px-20">
          <p className="text-4xl font-bold">Hello {name},</p>
          <p className="text-2xl italic">
            Find or Host an Event <br /> and Connect with Others
          </p>
          <Button variant="primary" icon={<FaPlus />} width="full" onClick={handleHostNewEvent}>
            Host a new Event
          </Button>
          <p className="text-4xl font-bold"></p>
          <span className="self-center mb-5">
            <EventCalendar onChange={selectedDateOnChange} />
          </span>
          <Button outline="info">Events I'm hosting</Button>
          <Button outline="info">Events I'm attending</Button>
        </div>
        <UpcomingEvents />          
      </div>
    </>
  );
}

export default UserDash;
