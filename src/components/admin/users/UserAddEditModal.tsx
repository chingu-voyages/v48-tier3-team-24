import type { ClientUser } from "~/server/api/routers/user";
import { useUserAdminContext } from "~/pages/admin/users";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import { ChangeEvent, FormEvent, useState } from "react";

/**
 * Dual-purpose user panel. Can be used for adding or editing user.
 * 
 * @param {ClientUser | null} user if null, then this is used for adding
 */
const UserAddEditModal = ({user}:{user:ClientUser | null}) => {
  const isEdit = user != null;
  const [ isResetPassword, setIsResetPassword ] = useState<boolean> (false);
  const { setUserModalOpen } = useUserAdminContext();

  const toggleIsResetPassword = (event:ChangeEvent<HTMLInputElement>) => {
    setIsResetPassword(event.target.checked);
  };

  const onSubmit = (event:FormEvent) => {
    event.preventDefault();
  };

  return (
    <Modal modalOpen={true}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <h1 className="text-xl text-center font-bold">
          {!isEdit ? "Create New User" : `Edit User - ${user.username ?? user.name}`}
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={isEdit ? user.username ?? undefined : undefined}
            className="px-3 py-1 border"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={isEdit ? user.email ?? undefined : undefined}
            className="px-3 py-1 border" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" className="text-sm">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            defaultValue={isEdit ? user.firstName ?? undefined : undefined}
            className="px-3 py-1 border" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="text-sm">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            defaultValue={isEdit ? user.lastName ?? undefined : undefined}
            className="px-3 py-1 border" />
        </div>
        { isEdit &&
          <div>
            <label className="flex flex-row items-center gap-1">
              <input type="checkbox" onChange={toggleIsResetPassword} />
              Reset Password
            </label>
          </div>
        }
        { (isResetPassword || !isEdit) &&
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm">Password</label>
              <input id="password" name="password" type="password" required className="px-3 py-1 border" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required className="px-3 py-1 border" />
            </div>
          </>
        }
        <div className="flex flex-row gap-5">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button type="button" variant="warning" onClick={() => setUserModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserAddEditModal;