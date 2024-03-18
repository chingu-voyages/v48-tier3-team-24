import { RiMenu4Fill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { MdOutlineEvent } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

import type { Session } from "next-auth";
import { useState } from "react";
import HeaderDropDownMenuItem from "./HeaderDropDownMenuItem";
import { signOut } from "next-auth/react";

interface HeaderDropDownMenuProps {
  className?: string;
  sessionData: Session | null;
  goTo: (route: string) => void;
}

export default function HeaderDropDownMenu(props: HeaderDropDownMenuProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const setMenuOpenStatus = () => {
    setOpenMenu(!openMenu);
  };
  const logout = async () => {
    await signOut();
  };

  return (
    <div className={props.className}>
      <div className="relative block md:hidden">
        <RiMenu4Fill
          className="cursor-pointer text-3xl"
          onMouseEnter={setMenuOpenStatus}
        />
        {props.sessionData ? (
          <div>
            {openMenu && (
              <div
                className="absolute right-0 top-10 min-w-44 rounded p-5 shadow-lg"
                onMouseLeave={setMenuOpenStatus}
              >
                <HeaderDropDownMenuItem
                  icon={<FaRegCircleUser className="text-xl" />}
                  label="My Profile"
                  onClick={() => props.goTo("/profile")}
                />
                <hr className="my-3"></hr>
                <HeaderDropDownMenuItem
                  icon={<MdOutlineEvent className="text-xl" />}
                  label="My Event"
                  onClick={() => props.goTo("/my-event")}
                />
                <hr className="my-3"></hr>
                <HeaderDropDownMenuItem
                  icon={<IoMdNotificationsOutline className="text-xl" />}
                  label="Notification"
                  onClick={() => props.goTo("/notification")}
                />
                <hr className="my-3"></hr>
                <HeaderDropDownMenuItem
                  icon={<MdOutlineLogout className="text-xl" />}
                  label="Sign out"
                  onClick={logout}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {openMenu && (
              <div
                className="absolute right-0 top-10 min-w-44 rounded p-5 shadow-lg"
                onMouseLeave={setMenuOpenStatus}
              >
                <HeaderDropDownMenuItem
                  icon={<MdOutlineLogin className="text-xl" />}
                  label="Login"
                  onClick={() => props.goTo("/login")}
                />
                <hr className="my-3"></hr>
                <HeaderDropDownMenuItem
                  icon={<BiJoystick className="text-xl" />}
                  label="Sign Up"
                  onClick={() => props.goTo("/register")}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
