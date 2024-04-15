import type { ClientEvent } from "~/server/api/routers/event";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ReactNode, SetStateAction, Dispatch } from "react";
import { useState, createContext, useContext } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import { createCaller } from "~/utils/trpcCaller";
import { getServerAuthSession } from "~/server/auth";
import EventAddButton from "~/components/admin/events/EventAddButton";
import EventAddEditModal from "~/components/admin/events/EventAddEditModal";
import EventFilter from "~/components/admin/events/EventFilter";
import EventPaginator from "~/components/admin/events/EventPaginator";
import EventTable from "~/components/admin/events/EventTable";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

interface InitialEventsState {
  events: ClientEvent[];
  total: number;
  page: number;
  perPage: number;
};

interface EventAdminContext {
  events: ClientEvent[];
  setEvents: Dispatch<SetStateAction<ClientEvent[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  pages: number,
  setPages: Dispatch<SetStateAction<number>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
  search: string | null;
  setSearch: Dispatch<SetStateAction<string | null>>;
  eventModalOpen: boolean;
  setEventModalOpen: Dispatch<SetStateAction<boolean>>;
  modalEvent: ClientEvent | null;
  setModalEvent: Dispatch<SetStateAction<ClientEvent | null>>;
};

const initialEventAdminContext:EventAdminContext = {
  events: [],
  setEvents: () => {return;},
  page: DEFAULT_PAGE,
  setPage: () => {return;},
  perPage: DEFAULT_PER_PAGE,
  setPerPage: () => {return;},
  pages: 1,
  setPages: () => {return;},
  total: 0,
  setTotal: () => {return;},
  search: null,
  setSearch: () => {return;},
  eventModalOpen: false,
  setEventModalOpen: () => {return;},
  modalEvent: null,
  setModalEvent: () => {return;}
};

const EventAdminContext = createContext(initialEventAdminContext);

export const getServerSideProps = (async (context) => {
  const page = DEFAULT_PAGE;
  const perPage = DEFAULT_PER_PAGE;
  const { req, res } = context;
  const session = await getServerAuthSession({ req, res });
  const caller = createCaller(session);
  const response = await caller.event.adminGetPaginatedEvents({ page, perPage, search: null });
  return {
    props: {
      initialEventsState: {
        events: response.events.map(
          event => (
            {
              ...event,
              // Why this is necessary: https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
              startDateTime: String(event.startDateTime),
              endDateTime: String(event.endDateTime),
              createdAt: String(event.createdAt),
              updatedAt: String(event.updatedAt)
            }
          )
        ),
        total: response.total,
        page,
        perPage
      }
    }
  };
}) satisfies GetServerSideProps<{ initialEventsState:InitialEventsState }>

const AdminEventManagement = (
  {initialEventsState}
  :InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [ page, setPage ] = useState<number> (initialEventsState.page);
  const [ perPage, setPerPage ] = useState<number> (initialEventsState.perPage);
  const [ total, setTotal ] = useState<number> (initialEventsState.total);
  const [ pages, setPages ] = useState<number> (Math.ceil(initialEventsState.total / initialEventsState.perPage));
  const [ search, setSearch ] = useState<string | null> (null);
  const [ events, setEvents ] = useState<ClientEvent[]> (initialEventsState.events);
  const [ eventModalOpen, setEventModalOpen ] = useState<boolean> (false);
  const [ modalEvent, setModalEvent ] = useState<ClientEvent | null> (null);

  const openEventAddModal = () => {
    setModalEvent(null);
    setEventModalOpen(true);
  };
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center font-bold text-lg">Events</h1>
      <EventAdminContext.Provider value={{
        page, setPage,
        total, setTotal,
        perPage, setPerPage,
        pages, setPages,
        search, setSearch,
        events, setEvents,
        eventModalOpen, setEventModalOpen,
        modalEvent, setModalEvent
      }}>
        { (eventModalOpen) &&
          <EventAddEditModal event={modalEvent}/>
        }
        <EventFilter />
        <EventAddButton onClick={openEventAddModal} />
        <EventTable />
        <EventPaginator />
      </EventAdminContext.Provider>
    </div>
  );
};

AdminEventManagement.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export const useEventAdminContext = () => useContext(EventAdminContext);

export default AdminEventManagement;