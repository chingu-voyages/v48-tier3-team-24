import React from "react";
import Button from "../Button";

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

interface TextInputProps {
  inputType: "text" | "textArea";
  label: string;
  id: string;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={props.id} className="text-sm">
        {props.label}
      </label>
      {/* <FiLock className="absolute left-4 top-9 text-blue-800" /> */}
      {props.inputType === "text" ? (
        <input
          id={props.id}
          type={props.inputType}
          name={props.id}
          required
          className="w-full border py-3 pl-10 pr-5 text-base sm:w-96"
        />
      ) : (
        <textarea id={props.id} name={props.id} className="w-full border py-3 pl-10 pr-5 text-base sm:w-96"></textarea>
      )}
    </div>
  );
};

export default NewEvent;
