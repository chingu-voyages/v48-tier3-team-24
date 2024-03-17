import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";

export default function HeaderProfileIconMenu() {
  const router = useRouter();
  const [openIconMenu, setOpenIconMenu] = useState(false);
  const goTo = async (route: string) => {
    /* TODO redirect to a page  */
    console.log("manage event button onClick", route);
    await router.push(route);
  };
  const onClickIconMenu = () => {
    setOpenIconMenu(!openIconMenu);
    console.log("onclick menu");
  };

  const logout = () => {
    console.log("logout");
  };
  return (
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
            <p>Sign out</p>
          </div>
        </div>
      )}
    </div>
  );
}
