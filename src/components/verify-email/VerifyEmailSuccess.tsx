import Link from "next/link";
import Image from "next/image";

const VerifyEmailSuccess = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-5">
        <Image src="/logo/EventSync.svg" alt="EventSync Logo" width={250} height={0} />
        Your account has been successfully verified.
        <Link href="/login" className="px-3 py-1 font-bold rounded-full border border-es-primary bg-es-primary text-white hover:bg-white hover:text-es-primary hover:shadow-xl">
          Go to EventSync
        </Link>
    </section>
  );
}

export default VerifyEmailSuccess;