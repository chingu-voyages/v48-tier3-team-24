import type { ClientUser } from "~/server/api/routers/user"
import { MdEdit, MdDelete } from "react-icons/md";
import { useUserAdminContext } from "~/pages/admin/users";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const UserRow = ({user}:{user:ClientUser}) => {
  const router = useRouter();
  const deleteUserMutation = api.user.adminDeleteUser.useMutation();
  const { setUserModalOpen, setModalUser } = useUserAdminContext();

  const openUserEditModal = () => {
    setModalUser(user);
    setUserModalOpen(true);
  };

  const deleteUser = async () => {
    try {
      if(confirm(`Are you sure you want to delete user: ${user.username ?? user.name}?`)) {
        await deleteUserMutation.mutateAsync({id: user.id});
        router.reload();
      }
    } catch(error:unknown) {
      if(error instanceof Error) toast.error(error.message);
      else toast.error("Unexpected error");
    }
  };

  return (
    <tr className="border-b border-neutral-200 dark:border-white/10">
      <td className="whitespace-nowrap px-6 py-2">{user.id}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.username}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.name}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.role}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.firstName}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.lastName}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.email}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.emailVerified?.toLocaleString()}</td>
      <td className="whitespace-nowrap px-6 py-2">
        <div className="flex flex-row gap-5 text-es-primary text-lg">
          <MdEdit onClick={openUserEditModal} className="cursor-pointer hover:text-es-warning" />
          <MdDelete onClick={deleteUser} className="cursor-pointer hover:text-es-danger" />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;