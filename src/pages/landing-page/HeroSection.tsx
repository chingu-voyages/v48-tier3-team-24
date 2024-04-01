import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import Button from "~/components/Button";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const session = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const goTo = async (route: string) => {
    await router.push(route);
  };
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-7 p-20 pt-36">
        <div className="rounded text-wrap">
        <h1 className="text-3xl pb-3">Find your tribe, explore interests, and create memorable experiences close to home</h1>
        <h2 className="grid row-start-1">Connect. Collaborate. Create: Your Community Hub</h2>
        </div>
        <div className="self-center justify-self-center">
          <Image
            src="/img/landing-page.png"
            width={550}
            height={150}
            alt="Dashboard example"
          />
        </div>
        <Button className="grid row-start-2" onClick={() => session.status === "authenticated" ? goTo("/dash") : goTo("/login")} outline="primary">Host an Event</Button>
      </div>
    </>
  );
}
