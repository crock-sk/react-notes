import css from "./Main.module.css";
import NoteList from "../NoteList/NoteList";
import { useNavigate } from "react-router";
import { createNote } from "../../services/notesService";
import toast from "react-hot-toast";
import AddBtn from "../AddBtn/AddBtn";

const Main = ({ setIsOpen, notes, setNotes, currentUser }) => {
  const navigate = useNavigate();

  const handleAddNote = async () => {
    if (!currentUser) {
      navigate('/')
      return toast.error("Please select a user first");
    }

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
      <div className={css.wrapper}>
        <div className={css.buttonWrapper}>
          <AddBtn text={"Add Note"} handleAddClick={handleAddNote} />
        </div>
        <NoteList notes={notes} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Main;



