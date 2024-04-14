import { useEventAdminContext } from "~/pages/admin/events";
import EventRow from "./EventRow";

const EventTable = () => {
  const { events } = useEventAdminContext();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto md:-mx-1">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light text-surface">
              <thead className="border-b border-neutral-200 font-medium">
                <tr>
                  <th className="px-6 py-2">ID</th>
                  <th className="px-6 py-2">name</th>
                  <th className="px-6 py-2">Description</th>
                  <th className="px-6 py-2">Image</th>
                  <th className="px-6 py-2">Start Date</th>
                  <th className="px-6 py-2">End Date</th>
                  <th className="px-6 py-2">Invite Link</th>
                  <th className="px-6 py-2">Maximum # of Participants</th>
                  <th className="px-6 py-2">Address</th>
                  <th className="px-6 py-2">City</th>
                  <th className="px-6 py-2">State</th>
                  <th className="px-6 py-2">Zip</th>
                  <th className="px-6 py-2">Latitude</th>
                  <th className="px-6 py-2">Longitude</th>
                  <th className="px-6 py-2">Status</th>
                  <th className="px-6 py-2">Private</th>
                  <th className="px-6 py-2">Free</th>
                  <th className="px-6 py-2">Price</th>
                  <th className="px-6 py-2">Created By</th>
                </tr>
              </thead>
              <tbody>
                { events.length > 0 &&
                  events.map((event) => (
                    <EventRow key={event.id} event={event} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTable;