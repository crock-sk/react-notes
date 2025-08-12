import css from "./NoteList.module.css";
import { NavLink } from "react-router";

export default function NoteList({ notes, setIsOpen }) {
  const priorityOrder = ["high", "medium", "low"];

  const groupedNotes = priorityOrder.map((priority) => ({
    priority,
    notes: notes.filter((note) => note.priority === priority),
  }));

  return (
    <div>
      {groupedNotes.map(
        (group) =>
          group.notes.length > 0 && (
            <div key={group.priority} className={css.group}>
              <h3 className={css.groupTitle}>{group.priority} Priority</h3>
              <ul className={css.list}>
                {group.notes.map((note) => (
                  <li
                    key={note.id}
                    onClick={() => setIsOpen(true)}
                    className={css.listItem}
                  >
                    <NavLink
                      to={`/notes/${note.id}`}
                      className={({ isActive }) =>
                        `${isActive ? css.active : ""} ${css.navLink}`.trim()
                      }
                    >
                      <h2 className={css.title}>{note.title}</h2>
                      <div className={css.wrapper}>
                        <span>Edit</span>
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
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
}
