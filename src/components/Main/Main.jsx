import css from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import NoteList from "../NoteList/NoteList";
import Title from "../Title/Title";
import { Link } from "react-router";

const Main = ({ isOpen, setIsOpen, notes }) => {
  console.log("isOpen", isOpen);
  const id = uuidv4();
  return (
    <div className={css.main}>
      <Title isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className={css.wrapper}>
        <div className={css.buttonWrapper}>
          <button
            className={css.button}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Link to={`/notes/${id}`} className={css.link}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H12M18 12H12M12 12V6M12 12V18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={css.textBtn}>Add Note</span>
            </Link>
          </button>
        </div>
        <NoteList notes={notes} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Main;
