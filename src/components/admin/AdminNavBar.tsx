import type { Session } from "next-auth";
import { useState, useRef } from "react";
import { useClickOutside } from "~/utils/hooks";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "next-auth/react";
import AdminProfileMenu from "./AdminProfileMenu";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import Image from "next/image";

const AdminNavBar = ({session}:{session:Session|null}) => {
  const profileName = session?.user.name ? session?.user.name : session?.user.username;
  const profileMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean> (false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState<boolean> (false);
  useClickOutside(profileMenuRef, () => setProfileMenuOpen(false));
  useClickOutside(hamburgerMenuRef, () => setHamburgerMenuOpen(false));

  const onProfileBtnClick = () => {
    setProfileMenuOpen(value => !value);
  };

  const onHamburgerBtnClick = () => {
    setHamburgerMenuOpen(value => !value);
  };

  const logout = async () => {
    await signOut({callbackUrl: "/login"});
  };

  return (
    <nav className="px-5 fixed top-0 left-0 right-0 h-12 flex flex-row justify-between items-center bg-white border-b z-40">
      <Image src="/logo/EventSync.svg" width={130} height={30} alt="logo" />
      <div ref={hamburgerMenuRef} className="md:hidden">
        <RxHamburgerMenu onClick={onHamburgerBtnClick} className="cursor-pointer" />
        {hamburgerMenuOpen &&
          <AdminHamburgerMenu
            toggle={setHamburgerMenuOpen}
            logout={logout}
          />
        }
      </div>
      <div ref={profileMenuRef} className="hidden md:block">
        <button onClick={onProfileBtnClick} className="px-5 py-1 rounded-full bg-es-primary text-white hover:bg-es-primary-light">
          <div className="flex flex-row gap-3 justify-center items-center align-text-bottom">
            <FaUser />
            <span className="font-bold">{profileName}</span>
          </div>
        </button>
        {profileMenuOpen && <AdminProfileMenu logout={logout} />}
      </div>
    </nav>
  );
};

export default AdminNavBar;