import type { MutableRefObject } from "react";

const AdminProfileMenu = ({reference, logout}:{reference:MutableRefObject<null>, logout:()=>void}) => {
  return (
    <ul ref={reference} className="hidden md:block rounded absolute top-12 right-5 bg-es-primary text-white">
      <li onClick={logout} className="rounded px-6 py-1 cursor-pointer hover:bg-es-primary-light hover:font-bold">
        Sign Out
      </li>
    </ul>
  );
};

export default AdminProfileMenu;