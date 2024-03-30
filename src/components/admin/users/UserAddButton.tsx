import { TiUserAdd } from "react-icons/ti";

const UserAddButton = ({onClick}:{onClick:()=>void}) => {
  return (
    <button type="button" onClick={onClick} className="w-full sm:w-3/5 lg:w-2/5 flex flex-row self-center justify-center gap-3 px-3 py-1 bg-es-primary text-white rounded hover:bg-es-primary-light cursor-pointer">
      <TiUserAdd className="text-2xl" />
      <span>Add User</span>
    </button>
  );
};

export default UserAddButton;