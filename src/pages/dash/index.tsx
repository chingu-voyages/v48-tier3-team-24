import { useSession } from "next-auth/react";
import React from "react";
import { SideNav } from "~/components/dash/sideNav";

function UserDash() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Access denied.</div>;
  }

  return (
    <section className="flex gap-4">
      <SideNav/>
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Events near you</div>
        <div>Carousel of events ranked nearest to furthest. Limit 10.</div>
        <div className="text-2xl">My Hosted Events</div>
        <div>Another carousel, this time hosted event for this user.</div>
        <div className="text-2xl">Events currently registered</div>
        <div className="text-2xl">Events currently registered</div>
      </div>
    </section>
  );
}

export default UserDash;
