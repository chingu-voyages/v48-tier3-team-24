import { useRouter } from "next/router";
import React from "react";
import NewEvent from "~/components/Event/NewEvent";

const CreateEventPage = () => {
  const router = useRouter();

  const reRoute = async (route: string) => {
    await router.push(route);
  };

  return <NewEvent reRoute={reRoute} />;
};

export default CreateEventPage;
