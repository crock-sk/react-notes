import css from './UserForm.module.css'
import { useState } from "react";
import { createUser } from "../../services/usersService";
import { useUsers } from "../../context/UsersContext";

const UserForm = () => {
  const [newUser, setNewUser] = useState("");
  const { setUsers } = useUsers();

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    const user = await createUser(newUser.trim());
    setUsers((prev) => [...prev, user]);
    setNewUser("");
  };

  return (
    <div>
      <h3 className={css.subTitle}>Add User</h3>
      <input
        className={css.input}
        name="name"
        type="text"
        placeholder="User name here"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button className={css.btn} onClick={handleAddUser}>
        Add
      </button>
    </div>
  );
};

export default UserForm