import Button from "./Button";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <div className="fixed w-full px-40 py-10">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div>Logo</div>
          <div>Search Bar</div>
        </div>
        <div className="flex items-center gap-8">
          <Button
            size="sm"
            className="hidden rounded-lg px-3 py-1 text-black md:block"
            outline="info"
          >
            Manage Event
          </Button>
          <IoMdNotificationsOutline className="text-3xl" />
          <div className="h-10 w-10 rounded-full border bg-black text-white">
            <p className="mt-2 text-center">W</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
