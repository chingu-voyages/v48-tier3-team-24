import Button from "./Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import HeaderProfileIconMenu from "./HeaderProfileIconMenu";
import HeaderDropDownMenu from "./HeaderDropDownMenu";
import SearchBar from "./SearchBar";

const Header = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  const goTo = async (route: string) => {
    await router.push(route);
  };

  const searchEvents = async () => {
    await goTo("event-search");
  };

  return (
    <div className="fixed min-h-10 w-full items-center px-20 py-10">
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <div>
            <Image
              src="/logo/EventSync.svg"
              width={150}
              height={50}
              alt="Logo of EventSync"
            />
          </div>
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
              onClick={() => goTo("/my-event")}
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
