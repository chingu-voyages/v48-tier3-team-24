import { useRouter } from "next/router";
import React from "react";
import NewEvent from "~/components/Event/NewEvent";

const createEventPage = () => {
  const router = useRouter()

  const reRoute = (route: string) => {
    router.push(route)
  }

  return (
    <NewEvent reRoute={reRoute}/>
  );
};

export default createEventPage;
