import { useState, type ChangeEvent, type FormEvent } from "react";
import { useEventAdminContext } from "~/pages/admin/events";
import { api } from "~/utils/api";
import { IoMdSearch } from "react-icons/io";

const EventFilter = () => {
  const { 
    page, perPage, search,
    setPage, setEvents, setTotal, setSearch, setPages 
  } = useEventAdminContext();
  api.event.adminGetPaginatedEvents.useQuery(
    { page, search, perPage },
    { onSuccess: (result) => {
        setEvents(result.events); 
        setTotal(result.total);
        setPages(Math.ceil(result.total / perPage));
      }, refetchOnWindowFocus: false
    }
  );
  const [value, setValue] = useState<string> ("");

  const onSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearch = !formData.get("search") ? null : String(formData.get("search"));
    setPage(1);
    setSearch(newSearch);
  };

  const onInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const clearFilter = async () => {
    setPage(1);
    setValue("");
    setSearch(null);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center pt-3 gap-3">
      <div className="flex flex-col relative">
        <label htmlFor="search" className="text-xs">Filter By</label>
        <input id="search" type="text" name="search" value={value} onChange={onInputChange} className="border border-es-primary px-3 py-1 pr-10" />
        <button type="submit" className="absolute flex justify-center items-center right-0 top-4 text-white bg-es-primary hover:bg-es-primary-light w-[34px] h-[34px]">
          <IoMdSearch />
        </button>
      </div>
      { search &&
        <div className="flex flex-col justify-center items-center">
          <span onClick={clearFilter} title="Click to remove filter" className="border border-es-primary-light rounded-full px-2 py-1 text-white bg-es-primary-light text-xs cursor-pointer hover:font-bold">
            {search}
          </span>
        </div>
      }
    </form>
  );
}

export default EventFilter;