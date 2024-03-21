import { signOut } from "next-auth/react";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import HeaderDropDownMenuItem from "./HeaderDropDownMenuItem";

interface HeaderDropDownMenuProps {
  goTo: (route: string) => void;
}

export default function HeaderProfileIconMenu(props: HeaderDropDownMenuProps) {
  const [openIconMenu, setOpenIconMenu] = useState(false);
  const onClickIconMenu = () => {
    setOpenIconMenu(!openIconMenu);
  };
  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <div className="relative">
      <div
        className="h-10 w-10 cursor-pointer rounded-full border bg-es-primary-light text-white hover:shadow-lg"
        onMouseEnter={onClickIconMenu}
      >
        <p className="mt-2 text-center">W</p>
      </div>
      {openIconMenu && (
        <div
          className="absolute right-0 top-14 min-w-44 rounded p-5 text-gray-700 shadow-lg"
          onMouseLeave={onClickIconMenu}
        >
          <HeaderDropDownMenuItem
            icon={<FaRegCircleUser className="text-xl" />}
            label="My Profile"
            onClick={() => props.goTo("/dash/my_profile")}
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
  );
}
