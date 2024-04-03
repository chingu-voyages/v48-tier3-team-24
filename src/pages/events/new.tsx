import React, { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import Datetime from "react-datetime";
import moment, { type Moment } from "moment";
import { api } from "~/utils/api";
import { NewEventSchema, type NewEvent } from "schemas";
import { useRouter } from "next/navigation";

const NewEvent = () => {
  const newEventMutation = api.event.create.useMutation();
  const router = useRouter();

  // to set up default values for the datetime pickers
  const now = moment().minutes(0);
  const [startDate, setStartDate] = useState<Date>(now.toDate());
  const [endDate, setEndDate] = useState<Date>(
    now.clone().add(1, "h").toDate(),
  );

  // to disable days before today in date pickers
  const yesterday = moment().subtract(1, "day");
  const blockDays = (current: Moment) => current.isAfter(yesterday);

  // set up initial form state
  const [formData, setFormData] = useState<NewEvent>(NewEventSchema.parse({}));

  const onFieldChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = event.currentTarget.value;
    setFormData({ ...formData, [event.currentTarget.id]: value });
  };

  const createNewEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = formData;
    // overwrite the form dates with our current state. Not the correct type.
    payload.startDateTime = startDate;
    payload.endDateTime = startDate;
    
    await newEventMutation
      .mutateAsync(payload)
      .then(() => router.push("/dash"))
      .catch((e) => console.error(e));
  };

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
          <TextInput
            type="text"
            id="name"
            label="Name of the Event"
            required
            onChange={onFieldChange}
          />
          <TextInput
            type="textArea"
            id="description"
            label="Describe your event:"
            required
            onChange={onFieldChange}
          />
          <TextInput type="text" id="imageUrl" label="Image URL" />
          <TextInput
            type="number"
            id="price"
            label="Price per attendee"
            min={0}
            placeholder="Free"
            onChange={onFieldChange}
          />
          <TextInput
            type="number"
            id="price"
            label="Max attendees"
            min={0}
            placeholder="No limit"
            onChange={onFieldChange}
          />
        </div>
        <div className="flex flex-col justify-start gap-5 px-5">
          <div>
            <label>When does your event begin?</label>
            <Datetime
              value={startDate}
              initialValue={startDate}
              isValidDate={blockDays}
              inputProps={datePickerInputProps}
              onChange={(event: string | Moment) => {
                // if it's a string, it's invalid
                // TODO: add a toast?
                if (typeof event === "string") return;

                if (event.toDate() > endDate) setEndDate(event.toDate())

                setStartDate(event.toDate());
              }}
            />
          </div>
          <div>
            <label>When does your event end?</label>
            <Datetime
              value={endDate}
              initialValue={endDate}
              isValidDate={blockDays}
              inputProps={datePickerInputProps}
              onChange={(event: string | Moment) => {
                // if it's a string, it's invalid
                // TODO: add a toast?
                if (typeof event === "string") return;

                setEndDate(event.toDate());
              }}
            />
          </div>
          <div>
            <div>
              <TextInput
                type={"text"}
                label={"City"}
                id={"city"}
                onChange={onFieldChange}
              />
              <TextInput
                type={"text"}
                label={"State"}
                id={"state"}
                min={2}
                max={2}
                onChange={onFieldChange}
              />
            </div>
          </div>
        </div>

        <Button type="submit" outline="primary">
          Create
        </Button>
        <Button type="button" outline="info" onClick={() => router.push("/dash")}>Cancel</Button>
      </form>
    </div>
  );
};

export default NewEvent;
