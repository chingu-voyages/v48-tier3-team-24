import Link from "next/link";

const VerifyEmailSuccess = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-3">
        Your account has been successfully verified.
        <Link href="/login" className="text-sm px-3 py-1 rounded border border-[#0A2A75] text-[#0A2A75] hover:bg-[#0A2A75] hover:bg-[#0A2A75] hover:text-white hover:shadow-xl">
          Go to EventSync
        </Link>
    </section>
  );
}

export default VerifyEmailSuccess;