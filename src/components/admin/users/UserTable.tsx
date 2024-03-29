import { useUserAdminContext } from "~/pages/admin/users";
import UserRow from "./UserRow";

const UserTable = () => {
  const { users } = useUserAdminContext();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto md:-mx-1">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th className="px-6 py-2">ID</th>
                  <th className="px-6 py-2">Username</th>
                  <th className="px-6 py-2">Discord Username</th>
                  <th className="px-6 py-2">User Role</th>
                  <th className="px-6 py-2">First Name</th>
                  <th className="px-6 py-2">Last Name</th>
                  <th className="px-6 py-2">Email</th>
                  <th className="px-6 py-2">Email Verified</th>
                  <th className="px-6 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                { users.length > 0 &&
                  users.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;