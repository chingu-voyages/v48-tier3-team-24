import { useRouter } from "next/router";
import React from "react";

const EventDetails = () => {
  const router = useRouter()
  // use the id to query the DB for the full dataset for this event
  const id = router.query.id

  return (
    <div>
      EventDetails<br/>{id}
    </div>
  );
};

export default EventDetails;
