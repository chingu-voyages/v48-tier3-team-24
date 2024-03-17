import { RiMenu4Fill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";

import { Session } from "next-auth";
import { useState } from "react";

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
                <div
                  className="hover:text-blue flex cursor-pointer items-center justify-between hover:text-cyan-600"
                  onClick={() => props.goTo("/profile")}
                >
                  <FaRegCircleUser />
                  <p>My Profile</p>
                </div>
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
                <div
                  className="hover:text-blue flex cursor-pointer items-center justify-between hover:text-cyan-600"
                  onClick={() => props.goTo("/login")}
                >
                  <MdOutlineLogin className="text-xl" />
                  <p>Login</p>
                </div>
                <hr className="my-3"></hr>
                <div
                  className="hover:text-blue flex cursor-pointer items-center justify-between hover:text-cyan-600"
                  onClick={() => props.goTo("/register")}
                >
                  <BiJoystick className="text-xl" />
                  <p>Sign Up</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
