import css from "./NoteList.module.css";

export default function NoteList({ notes, setActiveNote, setIsOpen }) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => {
            setActiveNote(note);
            setIsOpen(true);
          }}
          className={css.listItem}
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
        </li>
      ))}
    </ul>
  );
}
