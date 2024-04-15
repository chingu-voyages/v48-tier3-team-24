import type { ReactNode } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import type { NextPageWithLayout } from "~/pages/_app";

const AdminLanding:NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-xl font-bold">Administration Landing Page</h1>
      <p>Application administrators can manage all user accounts and events here.</p>
    </div>
  );
};

AdminLanding.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export default AdminLanding;