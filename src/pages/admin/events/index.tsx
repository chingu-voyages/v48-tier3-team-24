import type { ReactNode } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import type { NextPageWithLayout } from "~/pages/_app";

const AdminEventManagement:NextPageWithLayout = () => {
  return <p>Admin Events Page</p>
};

AdminEventManagement.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export default AdminEventManagement;