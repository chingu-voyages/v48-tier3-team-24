import Image from "next/image";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-3 p-3">
      <Image src="/img/unauthorized.svg" className="w-full sm:w-1/3" alt="unauthorized"/>
      <p className="font-bold text-lg">You are not authorized to access this page.</p>
      <Link href="/dash" className="font-bold text-es-primary hover:text-es-danger">Go back</Link>
    </section>
  );
};

export default Unauthorized;