import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import Button from "~/components/Button";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const session = useSession();
 
  const goTo = async (route: string) => {
    await router.push(route);
  };
  return (
    <>
      <div className="grid md:grid-cols-2 grid-rows-1 p-20 pt-36">
        <div className="rounded text-wrap">
        <h1 className="lg:text-5xl sm:text-3xl sm:pr-0 md:pr-20 pb-3 font-black leading-relaxed">Find your tribe, explore interests, and create memorable experiences close to home</h1>
        <h2 className="lg:text-2xl italic sm:pb-20">Connect. Collaborate. Create: Your Community Hub</h2>
        </div>
        <div className="self-center justify-self-center sm:pb-20">
          <Image
            src="/img/landing-page.png"
            width={750}
            height={150}
            alt="Dashboard example"
          />
        </div>
        <Button className="bg-gradient-to-r from-blue-900 to-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:from-blue-600 hover:to-green-600" onClick={() => session.status === "authenticated" ? goTo("/dash") : goTo("/login")} outline="primary">Host an Event</Button>
      </div>
    </>
  );
}
