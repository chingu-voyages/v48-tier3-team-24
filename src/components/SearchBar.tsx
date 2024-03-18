import { MouseEventHandler } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  id: string;
  className?: string;
  onClick: MouseEventHandler;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <form className={props.className}>
      <div className="flex text-sm">
        <input
          id={props.id}
          name={props.id}
          className="min-w-48 rounded rounded-br-none rounded-tr-none border px-2 py-2 text-xs"
          placeholder="Search Events by City, State, Zip"
        />
        <button
          type="submit"
          className="flex cursor-pointer items-center rounded-br-md rounded-tr-md bg-es-primary-light px-3 py-1 text-lg font-bold text-white"
          onClick={props.onClick}
        >
          <IoSearch />
        </button>
      </div>
    </form>
  );
}
