import type { ClientEvent } from "~/server/api/routers/event";
import type { ChangeEvent, FormEvent } from "react";
import type { EventStatus } from "@prisma/client";
import { useEventAdminContext } from "~/pages/admin/events";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { TextInput } from "~/components/TextInput";
import { NumberInput } from "~/components/NumberInput";
import { Checkbox } from "~/components/Checkbox";
import { Select } from "~/components/Select";
import Modal from "~/components/Modal";
import Button from "~/components/Button";

/**
 * Dual-purpose event panel. Can be used for adding or editing user.
 * 
 * @param {ClientEvent | null} event if null, then this is used for adding
 */
const EventAddEditModal = ({event}:{event:ClientEvent | null}) => {
  const isEdit = event != null;
  const createEventMutation = api.event.adminCreateEvent.useMutation();
  const editEventMutation = api.event.adminEditEvent.useMutation();
  const router = useRouter();
  const [ isFree, setIsFree ] = useState<boolean> (Boolean(event?.isFree));
  const { setEventModalOpen } = useEventAdminContext();
  const statuses = [
    { label: "Upcoming", value: "UPCOMING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Canceled", value: "CANCELED" }
  ];

  const convertDateTime = (datetime:string | Date) => {
    const date = new Date(datetime);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0,16);
  };

  const onPriceChange = (evt:ChangeEvent<HTMLInputElement>) => {
    setIsFree(evt.target.checked);
  };

  const onSubmit = async (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const formData:FormData = new FormData(evt.currentTarget);
      const name = formData.get("name") ? String(formData.get("name")) : undefined;
      const description = formData.get("description") ? String(formData.get("description")) : undefined;
      const streetAddress = formData.get("streetAddress") ? String(formData.get("streetAddress")) : undefined;
      const image = formData.get("image") ? String(formData.get("image")) : undefined;
      const startDateTime = formData.get("startDateTime") ? new Date(String(formData.get("startDateTime"))) : undefined;
      const endDateTime = formData.get("endDateTime") ? new Date(String(formData.get("endDateTime"))) : undefined;
      const inviteLink = formData.get("inviteLink") ? String(formData.get("inviteLink")) : undefined;
      const city = formData.get("city") ? String(formData.get("city")) : undefined;
      const state = formData.get("state") ? String(formData.get("state")) : undefined;
      const zip = formData.get("zip") ? String(formData.get("zip")) : undefined;
      const lat = formData.get("lat") ? Number(formData.get("lat")) : undefined;
      const lng = formData.get("lng") ? Number(formData.get("lng")) : undefined;
      const maxParticipants = formData.get("maxParticipants") ? Number(formData.get("maxParticipants")) : 0;
      const status = formData.get("status") as EventStatus;
      const isFree = formData.get("isFree") ? Boolean(formData.get("isFree")) : false;
      const isPrivate = formData.get("isPrivate") ? Boolean(formData.get("isPrivate")) : false;
      const price = formData.get("price");
      
      if(isEdit) {
        await editEventMutation.mutateAsync({
          id: event.id,
          name,
          description,
          image,
          startDateTime,
          endDateTime,
          inviteLink,
          streetAddress,
          city,
          state,
          zip,
          lat,
          lng,
          maxParticipants,
          status,
          isFree,
          isPrivate,
          price: isFree ? "0" : String(price)
        });
      } else {
        await createEventMutation.mutateAsync({
          name,
          description,
          image,
          startDateTime,
          endDateTime,
          inviteLink,
          streetAddress,
          city,
          state,
          zip,
          lat,
          lng,
          maxParticipants,
          status,
          isFree,
          isPrivate,
          price: isFree ? "0" : String(price)
        });
      }
      router.reload();
    } catch(error:unknown) {
      if(error instanceof Error) toast.error(error.message);
      else toast.error("Unexpected error");
    }
  };

  return (
    <Modal modalOpen={true}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <h1 className="text-xl text-center font-bold">
          {!isEdit ? "Create New Event" : `Edit Event - ${event.name}`}
        </h1>
        <TextInput
            id="name"
            label="Event Name"
            type="text"
            required={true}
            defaultValue={isEdit ? event.name : undefined}
          />
          <TextInput
            id="description"
            label="Description"
            type="textArea"
            required={true}
            defaultValue={isEdit ? event.description : undefined}
          />
          <TextInput
            id="image"
            label="Image URL"
            type="text"
            defaultValue={isEdit && event.image ? event.image : undefined}
          />
          <TextInput
            id="startDateTime"
            label="Event Start Date"
            type="datetime-local"
            required={true}
            defaultValue={isEdit ? convertDateTime(event.startDateTime) : undefined}
          />
          <TextInput
            id="endDateTime"
            label="Event End Date"
            type="datetime-local"
            required={true}
            defaultValue={isEdit ? convertDateTime(event.endDateTime) : undefined}
          />
          <TextInput
            id="inviteLink"
            label="Invitation Link"
            type="text"
            defaultValue={isEdit && event.inviteLink ? event.inviteLink : undefined}
          />
          <TextInput
            id="streetAddress"
            label="Street Address"
            type="text"
            required={true}
            defaultValue={isEdit && event.streetAddress ? event.streetAddress : undefined}
          />
          <TextInput
            id="city"
            label="City"
            type="text"
            required={true}
            defaultValue={isEdit && event.city ? event.city : undefined}
          />
          <TextInput
            id="state"
            label="State"
            type="text"
            required={true}
            defaultValue={isEdit && event.state ? event.state : undefined}
          />
          <TextInput
            id="zip"
            label="Zip"
            type="text"
            required={true}
            defaultValue={isEdit && event.zip ? event.zip : undefined}
          />
          {/* Todo - add google map here, click on the map to choose the address, and get lat&lng */}
          <TextInput
            id="lat"
            label="Latitude (optional)"
            type="text"
            defaultValue={isEdit && event.lat ? String(event.lat) : undefined}
          />
          <TextInput
            id="lng"
            label="Longitude (optional)"
            type="text"
            defaultValue={isEdit && event.lng ? String(event.lng) : undefined}
          />
          <NumberInput
            id="maxParticipants"
            label="Max. Participants"
            min={1}
            required={true}
            defaultValue={isEdit ? String(event.maxParticipants) : undefined}
          />
          {!isFree && (
            <NumberInput
              id="price"
              label="Price"
              min={0}
              required={true}
              defaultValue={isEdit ? String(event.price) : undefined}
            />
          )}
          <Checkbox
            id="isFree"
            label="Free Event"
            name="isFree"
            onChange={(onPriceChange)}
            defaultValue={isEdit ? event.isFree : undefined}
          ></Checkbox>
          <Checkbox
            id="isPrivate"
            label="Private Event"
            name="isPrivate"
            defaultValue={Boolean(event?.isPrivate)}
          ></Checkbox>
          {/* Todo - set status (EventStatus) - create a selection component */}
          <Select
            id="status"
            name="status"
            label="Status"
            defaultValue="UPCOMING"
            data={statuses}
          ></Select>
          {/* Todo - set Host (created by) - create a users selection component with search function */}
          {/* Todo - set Participants - create a users selection component with search function */}
          <hr />
        <div className="flex flex-col sm:flex-row gap-5">
          <Button type="submit" size="sm" variant="primary">
            Save
          </Button>
          <Button type="button" variant="warning" size="sm" onClick={() => setEventModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EventAddEditModal;