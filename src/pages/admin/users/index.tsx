import type { ClientUser } from "~/server/api/routers/user";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ReactNode, SetStateAction, Dispatch } from "react";
import { useState, createContext, useContext } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import { createCaller } from "~/utils/trpcCaller";
import { getServerAuthSession } from "~/server/auth";
import UserAddButton from "~/components/admin/users/UserAddButton";
import UserAddEditModal from "~/components/admin/users/UserAddEditModal";
import UserFilter from "~/components/admin/users/UserFilter";
import UserPaginator from "~/components/admin/users/UserPaginator";
import UserTable from "~/components/admin/users/UserTable";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

interface InitialUsersState {
  users: ClientUser[];
  total: number;
  page: number;
  perPage: number;
};

interface UserAdminContext {
  users: ClientUser[];
  setUsers: Dispatch<SetStateAction<ClientUser[]>>;
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
  userModalOpen: boolean;
  setUserModalOpen: Dispatch<SetStateAction<boolean>>;
  modalUser: ClientUser | null;
  setModalUser: Dispatch<SetStateAction<ClientUser | null>>;
};

const initialUserAdminContext:UserAdminContext = {
  users: [],
  setUsers: () => {return;},
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
  userModalOpen: false,
  setUserModalOpen: () => {return;},
  modalUser: null,
  setModalUser: () => {return;}
};

const UserAdminContext = createContext(initialUserAdminContext);

export const getServerSideProps = (async (context) => {
  const page = DEFAULT_PAGE;
  const perPage = DEFAULT_PER_PAGE;
  const { req, res } = context;
  const session = await getServerAuthSession({ req, res });
  const caller = createCaller(session);
  const response = await caller.user.getPaginatedUsers({ page, perPage, search: null });
  return {
    props: {
      initialUsersState: {
        users: response.users.map(
          user => (
            {
              ...user,
              // Why this is necessary: https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
              emailVerified: String(user.emailVerified)
            }
          )
        ),
        total: response.total,
        page,
        perPage
      }
    }
  };
}) satisfies GetServerSideProps<{ initialUsersState:InitialUsersState }>

const AdminUserManagement = (
  {initialUsersState}
  :InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [ page, setPage ] = useState<number> (initialUsersState.page);
  const [ perPage, setPerPage ] = useState<number> (initialUsersState.perPage);
  const [ total, setTotal ] = useState<number> (initialUsersState.total);
  const [ pages, setPages ] = useState<number> (Math.ceil(initialUsersState.total / initialUsersState.perPage));
  const [ search, setSearch ] = useState<string | null> (null);
  const [ users, setUsers ] = useState<ClientUser[]> (initialUsersState.users);
  const [ userModalOpen, setUserModalOpen ] = useState<boolean> (false);
  const [ modalUser, setModalUser ] = useState<ClientUser | null> (null);

  const openUserAddModal = () => {
    setModalUser(null);
    setUserModalOpen(true);
  };
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center font-bold text-lg">User Accounts</h1>
      <UserAdminContext.Provider value={{
        page, setPage,
        total, setTotal,
        perPage, setPerPage,
        pages, setPages,
        search, setSearch,
        users, setUsers,
        userModalOpen, setUserModalOpen,
        modalUser, setModalUser
      }}>
        { (userModalOpen) &&
          <UserAddEditModal user={modalUser}/>
        }
        <UserFilter />
        <UserAddButton onClick={openUserAddModal} />
        <UserTable />
        <UserPaginator />
      </UserAdminContext.Provider>
    </div>
  );
};

AdminUserManagement.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export const useUserAdminContext = () => useContext(UserAdminContext);

export default AdminUserManagement;