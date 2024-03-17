import Button from "./Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";

const Header = () => {
  const goToMyEvent = () => {
    /* TODO go to my event page  */
    console.log("manage event button onClick");
  };

  const showNotification = () => {
    /* TODO show a popup notification list  */
  };

  return (
    <div className="fixed min-h-10 w-full items-center px-20 py-5 shadow">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div>Logo</div>
          <div>Search Bar</div>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Button
            size="sm"
            className="rounded-lg px-3 py-1 text-black"
            outline="info"
            onClick={goToMyEvent}
          >
            Manage Event
          </Button>
          <IoMdNotificationsOutline
            className="text-3xl"
            onClick={showNotification}
          />
          <div className="h-10 w-10 rounded-full border bg-black text-white">
            <p className="mt-2 text-center">W</p>
          </div>
        </div>
        <div className="block text-3xl md:hidden">
          <RiMenu4Fill />
        </div>
      </div>
    </div>
  );
};

export default Header;
