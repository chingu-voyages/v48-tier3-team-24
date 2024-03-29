import type { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import AdminNavBar from "~/components/admin/AdminNavBar";
import AdminSideBar from "~/components/admin/AdminSideBar";
import AdminFooter from "~/components/admin/AdminFooter";
import Spinner from "~/components/Spinner";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  page: ReactNode
};

/**
 * The Admin Layout is the skeleton of the Admin Dashboard.
 */
export const AdminLayout = ({page}:AdminLayoutProps) => {
  const session = useSession();
  const router = useRouter();

  if(session.status === "loading") return <Spinner message="Loading..." />

  // If user is not authenticated or user is not of ADMIN, then display unauthorized page
  if(session.status === "unauthenticated" || session.data?.user.role !== Role.ADMIN)
    router.push("/unauthorized");

  return (
    <>
      <AdminNavBar session={session.data} />
      <AdminSideBar />
      <section className="px-3 pt-14 pb-14 md:pl-[300px]">
        {page}
      </section>
      <AdminFooter />
    </>
  )
};