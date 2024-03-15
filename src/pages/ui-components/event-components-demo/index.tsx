import type { EventItemType } from "~/components/Event/EventItem";
import EventItem from "~/components/Event/EventItem";
import DemoImage1 from "public/img/demo-image-1.jpg";
import { demoStatusData } from "../../../utils/demo_data";
import { EventList } from "~/components/Event/EventList";

const eventItemDemoData: EventItemType = {
  id: 1,
  name: "This is an Event Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod.",
  startDateTime: "2024/03/14 11pm",
  endDateTime: "2024/03/20 11pm",
  image: undefined,
  price: 0,
  maxParticipants: undefined,
  inviteLink: undefined,
  address: "this is an address",
  lat: undefined,
  lng: undefined,
  status: "UPCOMING",
  isPrivate: false,
  isFree: true,
  createdAt: "2024/03/13",
  updatedAt: "2024/03/13",
  host: {
    id: "1",
    name: null,
    username: "Brian Tam",
    password: null,
    firstName: null,
    lastName: null,
    email: null,
    emailVerified: null,
    role: "USER",
    image: null,
  },
  eventParticipants: [
    {
      id: "1",
      name: null,
      username: "Brian Tam",
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      emailVerified: null,
      role: "USER",
      image: null,
    },
    {
      id: "2",
      name: null,
      username: "Ivan A",
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      emailVerified: null,
      role: "USER",
      image: null,
    },
    {
      id: "3",
      name: null,
      username: "Michael P",
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      emailVerified: null,
      role: "USER",
      image: null,
    },
  ],
};

const eventItemDemoDataWithImage: EventItemType = {
  id: 1,
  name: "This is an Event Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod.",
  startDateTime: "2024/03/14 11pm",
  endDateTime: "2024/03/20 11pm",
  image: DemoImage1,
  price: 0,
  maxParticipants: undefined,
  inviteLink: undefined,
  address: "this is an address",
  lat: undefined,
  lng: undefined,
  status: "UPCOMING",
  isPrivate: false,
  isFree: true,
  createdAt: "2024/03/13",
  updatedAt: "2024/03/13",
  host: {
    id: "1",
    name: null,
    username: "Brian Tam",
    password: null,
    firstName: null,
    lastName: null,
    email: null,
    emailVerified: null,
    role: "USER",
    image: null,
  },
  eventParticipants: [
    {
      id: "1",
      name: null,
      username: "Brian Tam",
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      emailVerified: null,
      role: "USER",
      image: null,
    },
    {
      id: "2",
      name: null,
      username: "Ivan A",
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      emailVerified: null,
      role: "USER",
      image: null,
    },
    {
      id: "3",
      name: null,
      username: "Michael P",
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      emailVerified: null,
      role: "USER",
      image: null,
    },
  ],
};

const demoStatus = demoStatusData;

const EventComponentsDemo = () => {
  return (
    <>
      <div className="p-20">
        <div className="mb-10">
          <h1 className="mb-5 text-2xl font-bold">Event Card</h1>
          <div className="sm:w-full md:w-1/2 lg:w-1/3">
            <EventItem event={eventItemDemoData} />
          </div>
        </div>
        <div className="mb-10">
          <h1 className="mb-5 text-2xl font-bold">Event Card With Image</h1>
          <div className="sm:w-full md:w-1/2 lg:w-1/3">
            <EventItem event={eventItemDemoDataWithImage} />
          </div>
        </div>

        <div className="mb-10">
          <h1 className="mb-5 text-2xl font-bold">Event Card List</h1>
          <EventList events={demoStatus} />
        </div>
      </div>
    </>
  );
};

export default EventComponentsDemo;
