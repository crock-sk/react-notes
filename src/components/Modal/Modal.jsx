import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useState, useEffect } from "react";
import UserList from "../UserList/UserList";
import { fetchUsers, createUser } from "../../services/usersService";

export default function Modal({ setIsModalOpen, setCurrentUser }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleSelectUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(false);
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    const user = await createUser(newUser.trim());
    setUsers((prev) => [...prev, user]);
    setNewUser("");
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>Switch User</h2>
        <UserList users={users} handleSelectUser={handleSelectUser} />
        <p>or</p>
        <h3 className={css.subTitle}>Add User</h3>
        <input
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
    </div>,
    document.body
  );
}
