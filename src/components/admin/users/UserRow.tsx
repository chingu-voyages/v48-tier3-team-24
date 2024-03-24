import type { ClientUser } from "~/server/api/routers/user"

const UserRow = ({user}:{user:ClientUser}) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.role}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.emailVerified?.toLocaleString()}</td>
    </tr>
  );
};

export default UserRow;