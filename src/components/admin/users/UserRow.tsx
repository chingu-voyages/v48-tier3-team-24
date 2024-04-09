import type { ClientUser } from "~/server/api/routers/user"
import { MdEdit, MdDelete } from "react-icons/md";
import { useUserAdminContext } from "~/pages/admin/users";

const UserRow = ({user}:{user:ClientUser}) => {
  const { setUserModalOpen, setModalUser } = useUserAdminContext();

  const openUserEditModal = () => {
    setModalUser(user);
    setUserModalOpen(true);
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
          <MdDelete className="cursor-pointer hover:text-es-danger" />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;