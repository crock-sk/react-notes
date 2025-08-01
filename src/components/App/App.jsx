import { useState, useEffect } from "react";
import css from "./App.module.css";
import NoteForm from "../NoteForm/NoteForm";
import Main from "../Main/Main";
import Title from "../Title/Title";

// const initialNotes = [
//   { id: "1", title: "Note 1", content: "Content 1" },
//   { id: "2", title: "Note 2", content: "Content 2" },
//   { id: "3", title: "Note 3", content: "Content 3" },
//   { id: "4", title: "Note 4", content: "Content 4" },
//   { id: "5", title: "Note 5", content: "Content 5" },
//   { id: "6", title: "Note 6", content: "Content 6" },
// ];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [activeNote, setActiveNote] = useState({
    title: "",
    note: "",
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showMain = !isMobile || !isOpen;
  const showForm = (!isMobile && isOpen) || isOpen;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={css.container}>
      {showMain && (
        <Main
          setIsOpen={setIsOpen}
          setActiveNote={setActiveNote}
          notes={notes}
        ></Main>
      )}
      {showForm && (
        <>
          {isMobile && <Title setIsOpen={setIsOpen} />}
          <NoteForm
            notes={notes}
            setNotes={setNotes}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        </>
      )}
    </div>
  );
}

export default App;
