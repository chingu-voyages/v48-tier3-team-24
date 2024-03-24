import type { FormEvent } from "react";
import { useUserAdminContext } from "~/pages/admin/users";
import { api } from "~/utils/api";

const UserFilter = () => {
  const { 
    page, perPage, search,
    setPage, setUsers, setTotal, setSearch, setPages 
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

  const onSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearch = !formData.get("search") ? null : String(formData.get("search"));
    setPage(1);
    setSearch(newSearch);
  };

  const clearFilter = async () => {
    setPage(1);
    setSearch(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Filter By: </label>
        <input type="text" name="search" />
      </div>
      <div>
        <button type="submit">Filter</button>
        <button type="button" onClick={clearFilter}>Clear Filter</button>
      </div>
      <div>
        Current Filter: {search}
      </div>
    </form>
  );
}

export default UserFilter;