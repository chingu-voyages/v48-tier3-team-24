import Button from "./Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";
import Logo from "../../public/logo/EventSync.svg";
import Image from "next/image";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  const [openIconMenu, setOpenIconMenu] = useState(false);
  const goTo = (route: string) => {
    /* TODO redirect to a page  */
    console.log("manage event button onClick", route);
  };
  const onClickIconMenu = () => {
    setOpenIconMenu(!openIconMenu);
    console.log("onclick menu");
  };

  const logout = () => {
    console.log("logout");
  };

  return (
    <div className="fixed min-h-10 w-full items-center px-20 py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div>
            <Image
              src="/logo/EventSync.svg"
              width={150}
              height={50}
              alt="Logo of EventSync"
            />
          </div>
          <div>Search Bar</div>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Button
            size="sm"
            className="rounded-lg px-3 py-1 text-black"
            outline="info"
            onClick={() => goTo("/my-event")}
          >
            Manage Event
          </Button>
          <IoMdNotificationsOutline
            className="relative cursor-pointer text-3xl"
            onClick={() => goTo("/notification")}
          />
          <div className="relative">
            <div
              className="h-10 w-10 cursor-pointer rounded-full border bg-black text-white hover:shadow-lg"
              onMouseEnter={onClickIconMenu}
            >
              <p className="mt-2 text-center">W</p>
            </div>
            {openIconMenu && (
              <div
                className="absolute right-0 top-14 min-w-44 p-5 text-gray-700 shadow-lg"
                onMouseLeave={onClickIconMenu}
              >
                <div
                  className="hover:text-blue flex cursor-pointer items-center justify-between hover:text-cyan-600"
                  onClick={() => goTo("/profile")}
                >
                  <FaRegCircleUser />
                  <p>My Profile</p>
                </div>
                <hr className="my-3"></hr>
                <div
                  className="flex cursor-pointer items-center justify-between hover:text-cyan-600"
                  onClick={logout}
                >
                  <MdOutlineLogout />
                  <p>Logout</p>
                </div>
              </div>
            )}
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
