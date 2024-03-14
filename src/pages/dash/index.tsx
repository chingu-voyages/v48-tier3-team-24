import { useSession } from "next-auth/react";
import React from "react";
import EventList, { EventsType } from "~/components/dash/EventList";
import { SideNav } from "~/components/dash/sideNav";

function UserDash() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  const events1: EventsType[] = [
    {
      id: 1,
      name: "event name 1",
      description: "blurb 1",
      type: "virtual"
    },
    {
      id: 2,
      name: "event name 2",
      description: "blurb 2",
      type: "virtual"
    },
    {
      id: 3,
      name: "event name 3",
      description: "blurb 3",
      type: "in_person"
    },
  ]

  const events2: EventsType[] = [
    {
      id: 1,
      name: "event name 4",
      description: "blurb 1",
      type: "virtual"
    },
    {
      id: 2,
      name: "event name 5",
      description: "blurb 2",
      type: "virtual"
    },

  ]
  
  return (
    <section className="flex gap-4 p-6">
      <SideNav/>
      <div className="flex flex-col gap-6 pl-6">
        <EventList title="Events near you" events={events1}/>
        <EventList title="My Hosted Events" events={events2}/>
        <EventList title="Upcoming Registered Events" />
      </div>
    </section>
  );
}

export default UserDash;
