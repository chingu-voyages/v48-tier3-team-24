import { useUserAdminContext } from "~/pages/admin/users";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { api } from "~/utils/api";

const UserPaginator = () => {
  const { 
    perPage, page, pages,
    setPages, search, setPage, setUsers, setTotal 
  } = useUserAdminContext();
  api.user.getPaginatedUsers.useQuery(
    { page, search, perPage },
    { onSuccess: (result) => {
        setUsers(result.users); 
        setTotal(result.total);
        setPages(Math.ceil(result.total / perPage));
      }, refetchOnWindowFocus: false
    }
  );

  const onPrevPage = async () => {
    setPage((value) => value - 1 < 1 ? 1 : value - 1);
  };

  const onNextPage = async () => {
    setPage((value) => value + 1 > pages ? pages : value + 1);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <div onClick={onPrevPage} className="text-es-primary border border-es-primary p-1 cursor-pointer hover:text-white hover:bg-es-primary">
        <MdChevronLeft/>
      </div>
      <span>{page} / {pages}</span>
      <div onClick={onNextPage} className="text-es-primary border border-es-primary p-1 cursor-pointer hover:text-white hover:bg-es-primary">
        <MdChevronRight />
      </div>
    </div>
  );
};

export default UserPaginator;