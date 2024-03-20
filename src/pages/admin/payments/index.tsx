import type { ReactNode } from "react";
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import type { NextPageWithLayout } from "~/pages/_app";

const AdminPaymentManagement:NextPageWithLayout = () => {
  return <p>Admin Payments Page</p>
};

AdminPaymentManagement.getLayout = (page:ReactNode) => <AdminLayout page={page} />;

export default AdminPaymentManagement;