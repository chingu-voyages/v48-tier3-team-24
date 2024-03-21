import React, { type FormEvent } from "react";
import Button from "../Button";
import { TextInput } from "../TextInput";
import Datetime from "react-datetime";
import moment, { type Moment } from "moment";

const NewEvent = () => {
  const createNewEvent = (e: FormEvent) => {
    e.preventDefault();
    alert("new event");
  };

  // to disable days before today in date pickers
  const yesterday = moment().subtract(1, "day");
  const blockDays = (current: Moment) => current.isAfter(yesterday);

  // set up the props to modify the datepicker input box
  const datePickerInputProps = {
    className: "border-2 rounded-md p-2 hover:shadow",
  };

  return (
    <div className="container p-5">
      <h1 className="mb-5 border-b-2 border-gray-500 text-3xl font-bold text-blue-800">
        New Event
      </h1>
      <form
        onSubmit={createNewEvent}
        className="flex h-full w-full items-center gap-5"
      >
        <div className="flex flex-col gap-5">
          <TextInput type="text" id="name" label="Name of the Event" required />
          <TextInput
            type="textArea"
            id="description"
            label="Describe your event:"
            required
          />
          <TextInput type="text" id="imageUrl" label="Image URL" />
          <TextInput
            type="number"
            id="price"
            label="Price per participant"
            min={0}
          />
        </div>
        <div className="flex flex-col justify-start gap-5 px-5">
          <div>
            <label>When does your event begin?</label>
            <Datetime
              initialValue={moment()}
              isValidDate={blockDays}
              inputProps={datePickerInputProps}
            />
          </div>
          <div>
            <label>When does your event end?</label>
            <Datetime
              initialValue={moment().add(2, "hours")}
              isValidDate={blockDays}
              inputProps={datePickerInputProps}
            />
          </div>
        </div>

        <Button type="submit" outline="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewEvent;
