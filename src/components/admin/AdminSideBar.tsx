import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { useRouter } from "next/router";

const AdminSideBar = () => {
  const router = useRouter();
  const selectedRoute = router.pathname.replace("/admin", "");

  return (
    <aside className="hidden fixed left-0 top-12 bottom-12 md:flex bg-es-primary w-[290px] flex flex-col gap-10">
      <p className="py-3 text-center text-white font-bold text-xl bg-es-primary-light uppercase">Administration</p>
      <div className="flex flex-col">
        <Link href="/admin/users" className={`py-3 pl-3 flex flex-row items-center gap-3 text-white ${selectedRoute === "/users" ? "bg-es-primary-light font-bold" : "hover:bg-es-primary-light hover:pl-5"}`}>
          <FaRegUserCircle /> User Management
        </Link>
        <Link href="/admin/events" className={`py-3 pl-3 flex flex-row items-center gap-3 text-white ${selectedRoute === "/events" ? "bg-es-primary-light font-bold" : "hover:bg-es-primary-light hover:pl-5"}`}>
          <MdOutlineEventAvailable/>
          Event Management
        </Link>
      </div>
    </aside>
  );
};

export default AdminSideBar;