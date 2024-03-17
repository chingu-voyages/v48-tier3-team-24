import type { ReactNode } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import type { NextPageWithLayout } from "~/pages/_app";

const AdminLanding:NextPageWithLayout = () => {
  return <p>Admin Dashboard Landing</p>
};

AdminLanding.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export default AdminLanding;