import React from "react";
import Button from "../Button";
import { TextInput } from "../TextInput";

const NewEvent = () => {
  const createNewEvent = () => {alert('new event')};
  return (
    <form
      onSubmit={createNewEvent}
      className="flex h-full w-full flex-col items-center gap-5 sm:w-2/5"
    >
      <h1 className="text-3xl font-bold text-blue-800">New Event</h1>
      <TextInput inputType="text" id="name" label="Name of the Event" />
      <TextInput
        inputType="textArea"
        id="description"
        label="Describe your event:"
      />
      <Button type="submit" outline="primary">Create</Button>
    </form>
  );
};


export default NewEvent;
