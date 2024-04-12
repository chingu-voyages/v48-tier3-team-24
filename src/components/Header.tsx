import Button from "./Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderProfileIconMenu from "./HeaderProfileIconMenu";
import HeaderDropDownMenu from "./HeaderDropDownMenu";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const goTo = async (route: string) => {
    await router.push(route);
  };

  const searchEvents = async () => {
    await goTo("event-search");
  };

  return (
    <div className="min-h-10 w-full items-center px-20 py-10">
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image
              src="/logo/EventSync.svg"
              width={150}
              height={50}
              alt="Logo of EventSync"
            />
          </Link>
          <SearchBar
            id="event-search"
            className="hidden sm:block"
            onClick={searchEvents}
          />
        </div>

        {sessionData ? (
          <div className="hidden items-center gap-8 md:flex">
            <Button
              size="sm"
              className="rounded-lg px-3 py-1 text-black"
              outline="info"
              onClick={() => goTo("/dash")}
            >
              Manage Event
            </Button>
            <IoMdNotificationsOutline
              className="relative cursor-pointer text-3xl"
              onClick={() => goTo("/notification")}
            />
            <HeaderProfileIconMenu goTo={goTo} />
          </div>
        ) : (
          <div className="hidden items-center gap-8 md:flex">
            <div className="cursor-pointer" onClick={() => goTo("/login")}>
              Login
            </div>
            <div className="cursor-pointer" onClick={() => goTo("/register")}>
              Sign Up
            </div>
          </div>
        )}
        <HeaderDropDownMenu
          className="block md:hidden"
          goTo={goTo}
          sessionData={sessionData}
        />
      </div>
    </div>
  );
};

export default Header;
