import css from "./Main.module.css";
import NoteList from "../NoteList/NoteList";
import Title from "../Title/Title";
import { useNavigate } from "react-router";
import { createNote } from "../../services/notesService";
import toast from "react-hot-toast";

const Main = ({ isOpen, setIsOpen, notes, setNotes, currentUser }) => {
  const navigate = useNavigate();

  const handleAddNote = async () => {
    if (!currentUser) return toast.error("Please select a user first");

    setIsOpen(true);

    const newNote = await createNote(currentUser.id, {
      title: "",
      content: "",
      priority: "",
    });

    setNotes((prev) => [...prev, newNote]);

    navigate(`/notes/${newNote.id}`);
  };
  return (
    <div className={css.main}>
      <Title isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={css.wrapper}>
        <div className={css.buttonWrapper}>
          <button className={css.button} onClick={handleAddNote}>
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
          </button>
        </div>
        <NoteList notes={notes} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Main;



