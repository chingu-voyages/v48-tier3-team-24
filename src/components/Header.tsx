import Button from "./Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import HeaderProfileIconMenu from "./HeaderProfileIconMenu";

const Header = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [openIconMenu, setOpenIconMenu] = useState(false);

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  const goTo = async (route: string) => {
    /* TODO redirect to a page  */
    console.log("manage event button onClick", route);
    await router.push(route);
  };

  return (
    <div className="fixed min-h-10 w-full items-center px-20 py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div>
            <Image
              src="/logo/EventSync.svg"
              width={150}
              height={50}
              alt="Logo of EventSync"
            />
          </div>
          <div>Search Bar</div>
        </div>
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
          {sessionData ? (
            <HeaderProfileIconMenu/>
          ) : (
            <div className="cursor-pointer" onClick={() => goTo("/login")}>
              Sign In
            </div>
          )}
        </div>
        <div className="block text-3xl md:hidden">
          <RiMenu4Fill />
        </div>
      </div>
    </div>
  );
};

export default Header;
