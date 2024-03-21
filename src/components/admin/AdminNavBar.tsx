import type { Session } from "next-auth";
import { useState, useRef } from "react";
import { useClickOutside } from "~/utils/hooks";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "next-auth/react";
import AdminProfileMenu from "./AdminProfileMenu";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

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
    <nav className="px-5 fixed top-0 left-0 right-0 h-12 flex flex-row justify-between items-center bg-white border-b">
      <div className="">
        LOGO
      </div>
      <RxHamburgerMenu onClick={onHamburgerBtnClick} className="md:hidden cursor-pointer" />
      <button onClick={onProfileBtnClick} className="hidden md:block px-5 py-1 rounded-full bg-es-primary text-white hover:bg-es-primary-light">
        <div className="flex flex-row gap-3 justify-center items-center align-text-bottom">
          <FaUser />
          <span className="font-bold">{profileName}</span>
        </div>
      </button>
      {profileMenuOpen && <AdminProfileMenu reference={profileMenuRef} logout={logout} />}
      {hamburgerMenuOpen &&
        <AdminHamburgerMenu
          reference={hamburgerMenuRef}
          toggle={setHamburgerMenuOpen}
          logout={logout}
        />
      }
    </nav>
  );
};

export default AdminNavBar;