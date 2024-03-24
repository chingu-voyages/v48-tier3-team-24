import { useUserAdminContext } from "~/pages/admin/users";
import UserRow from "./UserRow";

const UserTable = () => {
  const { users } = useUserAdminContext();
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Discord Username</th>
          <th>User Role</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Email Verified</th>
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
  );
};

export default UserTable;