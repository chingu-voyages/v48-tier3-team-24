import Image from "next/image";
import Link from "next/link";
import { PiConfettiBold } from "react-icons/pi";

const RegistrationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Image src="/logo/EventSync.svg" alt="EventSync Logo" width={250} height={0} />
      <span className="flex flex-row gap-1">
        Registration Success!
        <PiConfettiBold className="text-lg text-es-primary" />
      </span>
      <span className="text-xl font-bold">
        Please check your email to verify your account.
      </span>
      <Link href="/login" className="font-bold px-3 py-1 rounded-full border border-es-primary bg-es-primary text-white hover:text-es-primary hover:bg-white">
        Go to Login
      </Link>
    </div>
  )
}

export default RegistrationSuccess;