import { useRouter } from "next/router";
import Button from "~/components/Button";
import Image from "next/image";

export default function HeroSection() {
    const router = useRouter();
  
    const goTo = async (route: string) => {
      await router.push(route);
    };
    return (
        <>
         <h1>Title</h1>
         <h2>Description</h2>
         <div>
            <Image
              src="/logo/EventSync.svg"
              width={150}
              height={50}
              alt="Logo of EventSync"
            />
          </div>
         <Button onClick={() => goTo("/my-event")} outline="primary">CTA</Button>
        </>
    );
}
