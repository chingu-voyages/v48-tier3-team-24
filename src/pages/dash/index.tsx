import { useSession } from "next-auth/react";
import React from "react";
import { EventList } from "~/components/Event/EventList";
import { SideNav } from "~/components/dash/SideNav";
import demoStatusData from "~/pages/ui-components/event-components-demo/demo_data";

function UserDash() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  const events1 = demoStatusData.slice(0, 1);
  const events2 = demoStatusData.slice(1, 3);

  return (
    <section className="flex gap-4 p-6">
      <SideNav />
      <div className="flex flex-col gap-6 pl-6">
        <EventList events={events1} />
        <EventList events={events2} />
      </div>
    </section>
  );
}

export default UserDash;
