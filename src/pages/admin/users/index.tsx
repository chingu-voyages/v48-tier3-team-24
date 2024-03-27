import type { ReactNode } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import type { NextPageWithLayout } from "~/pages/_app";

const AdminUserManagement:NextPageWithLayout = () => {
  return <p>Admin Users Page</p>
};

AdminUserManagement.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export default AdminUserManagement;