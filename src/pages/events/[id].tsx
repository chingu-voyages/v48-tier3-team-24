import React from "react";

const EventDetails = (params: { id: string }) => {
  return (
    <div>
      EventDetails<br>{params.id}</br>
    </div>
  );
};

export default EventDetails;
