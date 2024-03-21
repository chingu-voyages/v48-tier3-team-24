import Link from "next/link";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useRouter } from "next/router";

const AdminHamburgerMenu = (
  {reference, toggle, logout}:
  {reference:MutableRefObject<null>, toggle:Dispatch<SetStateAction<boolean>>, logout:()=>void}
) => {
  const router = useRouter();
  const selectedRoute = router.pathname.replace("/admin", "");
  const closeMenu = () => {
    toggle(false);
  };

  return (
    <ul ref={reference} onClick={closeMenu} className="md:hidden absolute top-12 left-0 right-0 bg-es-primary text-white">
      <li className={`cursor-pointer ${selectedRoute === "/users" ? "bg-es-primary-light font-bold" : "hover:bg-es-primary-light"}`}>
        <Link href="/admin/users" className="block px-5 py-2">
          User Management
        </Link>
      </li>
      <li className={`cursor-pointer ${selectedRoute === "/events" ? "bg-es-primary-light font-bold" : "hover:bg-es-primary-light"}`}>
        <Link href="/admin/events" className="block px-5 py-2">
          Event Management
        </Link>
      </li>
      <li className={`cursor-pointer ${selectedRoute === "/payments" ? "bg-es-primary-light font-bold" : "hover:bg-es-primary-light"}`}>
        <Link href="/admin/payments" className="block px-5 py-2">
          Payment Management
        </Link>
      </li>
      <li onClick={logout} className="px-5 py-2 cursor-pointer hover:bg-es-primary-light">
        Sign Out
      </li>
    </ul>
  );
};

export default AdminHamburgerMenu;