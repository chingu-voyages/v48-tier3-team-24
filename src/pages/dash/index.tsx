import { useSession } from "next-auth/react";
import React from "react";

function UserDash() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>
        Access denied.
    </div>;
  }

  return <section>
    <div>Events near you</div>
    
    <div>My Events</div>
    <div>carosel of public events?</div>
    
    <div>events that you currently registered to</div>
  </section>
}

export default UserDash;
