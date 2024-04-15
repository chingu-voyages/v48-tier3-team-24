import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
      <div className="pt-30 grid grid-rows-1 p-20 md:grid-cols-2">
        <div className="col-span-1 text-wrap rounded">
          <div className="flex h-full items-center justify-center">
            <div>
              <h1 className="pb-5 text-3xl font-black leading-relaxed sm:pr-0 sm:text-3xl md:pr-20 lg:text-5xl">
                Find your tribe, explore interests, and create memorable
                experiences close to home
              </h1>
              <h2 className="mb-10 italic lg:text-2xl">
                Connect. Collaborate. Create: Your Community Hub
              </h2>
              <Button
                className="rounded-md bg-gradient-to-r from-blue-900 to-green-500 px-4 font-semibold text-white shadow-md hover:from-blue-600 hover:to-green-600"
                onClick={() =>
                  session.status === "authenticated"
                    ? goTo("/dash")
                    : goTo("/login")
                }
                outline="primary"
              >
                Host an Event
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1 self-center justify-self-center pb-20 sm:pb-20 md:pb-0 lg:pb-0">
          <Image
            src="/img/landing-page.png"
            width={750}
            height={150}
            alt="Dashboard example"
          />
        </div>
      </div>
    </>
  );
}
