import type { ClientUser } from "~/server/api/routers/user";
import { useUserAdminContext } from "~/pages/admin/users";
import Modal from "~/components/Modal";

/**
 * Dual-purpose user panel. Can be used for adding or editing user.
 * 
 * @param {ClientUser | null} user if null, then this is used for adding
 */
const UserAddEditModal = ({user}:{user:ClientUser | null}) => {
  const isEdit = user != null;
  const { setUserModalOpen } = useUserAdminContext();

  return (
    <Modal modalOpen={true}>
      <form>
        <h1 className="text-lg text-center font-bold">
          {!isEdit ? "Create New User" : `Edit User - ${user.username ?? user.name}`}
        </h1>
        <button type="button" onClick={() => setUserModalOpen(false)}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default UserAddEditModal;