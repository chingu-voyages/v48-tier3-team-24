import {
  BaseSyntheticEvent,
  EventHandler,
  useState,
  type ReactNode,
} from "react";
import Button from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import Modal from "~/components/Modal";
import { NumberInput } from "~/components/NumberInput";
import { TextInput } from "~/components/TextInput";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { MouseEventHandler } from "react";

const AdminEventManagement: NextPageWithLayout = (props) => {
  const [showEventFormModal, setShowEventFormModal] = useState<boolean>(false);
  const [isFree, setIsFree] = useState<boolean>(true);
  const [isPrivate, setIsPrivate] = useState<boolean>(true);

  const onSetShowEventFormModel = () => {
    setShowEventFormModal(!showEventFormModal);
  };
  const onCreateEvent = async () => {
    return;
  };
  const onPriceStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFree(event.target.checked);
  };
  const onPrivateStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsPrivate(event.target.checked);
  };
  return (
    <div>
      <p>Admin Events Page</p>
      <Button variant="primary" onClick={onSetShowEventFormModel}>
        Create an Event
      </Button>
      <Modal modalOpen={showEventFormModal}>
        <p className="mb-5 text-lg">Create an Event</p>
        <form className="grid grid-cols-1 gap-5" onSubmit={onCreateEvent}>
          <TextInput
            id="name"
            label="Event Name"
            inputType="text"
            required={true}
          />
          <TextInput
            id="description"
            label="Description"
            inputType="textArea"
            required={true}
          />
          <TextInput
            id="address"
            label="address"
            inputType="text"
            required={true}
          />
          {/* Todo - add google map here, click on the map to choose the address, and get lat&lng */}
          <TextInput
            id="lat"
            label="latitude (optional)"
            inputType="text"
            required={true}
          />
          <TextInput
            id="lng"
            label="longitude (optional)"
            inputType="text"
            required={true}
          />
          <NumberInput
            id="maxParticipants"
            label="Max. Participants"
            min={1}
            defaultValue={1}
            required={true}
          />
          {!isFree ? (
            <NumberInput
              id="price"
              label="Price"
              min={0}
              defaultValue={0}
              required={true}
            />
          ) : (
            ""
          )}

          <Checkbox
            id="isFree"
            label="Free Event"
            defaultValue={isFree}
            onChange={onPriceStatusChange}
          ></Checkbox>
          <Checkbox
            id="isPrivate"
            label="Private Event"
            defaultValue={isPrivate}
            onChange={onPrivateStatusChange}
          ></Checkbox>
          {/* Todo - set status (EventStatus) - create a selection component */}
          {/* Todo - set Host (created by) - create a users selection component with search function */}
          {/* Todo - set Participants - create a users selection component with search function */}
          <hr />
          <div className="flex w-full justify-between gap-5">
            <Button outline="info" onClick={onSetShowEventFormModel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

AdminEventManagement.getLayout = (page: ReactNode) => (
  <AdminLayout page={page} />
);

export default AdminEventManagement;
