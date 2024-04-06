import Link from "next/link";
import Image from "next/image";

const RecoverSuccess = () => {
  return (
    <p className="flex flex-col gap-5 items-center">
      <Image src="/logo/EventSync.svg" width={230} height={0} alt="EventSync Logo" className="self-center" />
      Recovery was successful. If you provided the correct information, you should receive an email.
      <Link href="/login" className="font-bold px-3 py-1 rounded-full border border-es-primary bg-es-primary text-white hover:text-es-primary hover:bg-white">
        Go to Login
      </Link>
    </p>
  );
};

export default RecoverSuccess;