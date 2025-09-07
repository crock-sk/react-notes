import css from "./UserList.module.css";

export default function UserList({ users, handleSelectUser }) {

  return (
    <ul className={css.list}>
      {users.map((user) => (
        <li
          key={user.id}
          className={css.listItem}
          onClick={() => handleSelectUser(user)}
        >
            <h2 className={css.title}>{user.name}</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#9EA2AE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </li>
      ))}
    </ul>
  );
}
