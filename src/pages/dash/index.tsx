import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import EventContainer from "~/components/Event/EventContainer";
import { demoStatusData } from "~/utils/demo_data";
import { api } from "~/utils/api";

function UserDash() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: hostedData, isLoading: hostedLoading } =
    api.event.getAllHostedEvents.useQuery();
  const { data: attendingData, isLoading: attendingLoading } =
    api.event.getAllAttendingEvents.useQuery();

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  const events1 = demoStatusData.slice(0, 1);
  const events2 = demoStatusData.slice(1, 3);

  if (hostedLoading || attendingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="flex flex-row gap-8 border-b-4 p-5">
        <Link href="">Browse Events</Link>
        <Link href="">My Profile</Link>
        <Link
          href="/"
          onClick={() =>
            signOut({ redirect: false }).then(() => router.push("/"))
          }
        >
          Sign out
        </Link>
      </nav>
      <h1>Data from database</h1>
      <section className="flex flex-col gap-6 p-6">
        <EventContainer title="My hosted events" events={hostedData} />
        <EventContainer
          title="Upcoming registered events"
          events={attendingData}
        />
      </section>
      <h1>Demo data made by Brian</h1>
      <section className="flex flex-col gap-6 p-6">
        <EventContainer title="My hosted events" events={events1} />
        <EventContainer title="Upcoming registered events" events={events2} />
      </section>
    </>
  );
}

export default UserDash;
