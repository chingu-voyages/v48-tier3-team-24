import type { ClientEvent } from "~/server/api/routers/event"
import { MdEdit, MdDelete } from "react-icons/md";
import { useEventAdminContext } from "~/pages/admin/events";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const EventRow = ({event}:{event:ClientEvent}) => {
  const router = useRouter();
  const deleteEventMutation = api.event.adminDeleteEvent.useMutation();
  const { setEventModalOpen, setModalEvent } = useEventAdminContext();

  const openEventEditModal = () => {
    setModalEvent(event);
    setEventModalOpen(true);
  };

  const deleteEvent = async () => {
    try {
      if(confirm(`Are you sure you want to delete event: ${event.name}?`)) {
        await deleteEventMutation.mutateAsync({id: event.id});
        router.reload();
      }
    } catch(error:unknown) {
      if(error instanceof Error) toast.error(error.message);
      else toast.error("Unexpected error");
    }
  };

  return (
    <tr className="border-b border-neutral-200">
      <td className="whitespace-nowrap px-6 py-2">{event.id}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.name}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.description}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.image}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.startDateTime?.toLocaleString()}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.endDateTime?.toLocaleString()}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.inviteLink}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.maxParticipants}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.streetAddress}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.city}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.state}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.zip}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.lat}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.lng}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.status}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.isPrivate ? "Yes" : "No"}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.isFree ? "Yes" : "No"}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.price}</td>
      <td className="whitespace-nowrap px-6 py-2">{event.createdById}</td>
      <td className="whitespace-nowrap px-6 py-2">
        <div className="flex flex-row gap-5 text-es-primary text-lg">
          <MdEdit onClick={openEventEditModal} className="cursor-pointer hover:text-es-warning" />
          <MdDelete onClick={deleteEvent} className="cursor-pointer hover:text-es-danger" />
        </div>
      </td>
    </tr>
  );
};

export default EventRow;