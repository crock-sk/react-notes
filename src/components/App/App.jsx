import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import css from "./App.module.css";
import NoteForm from "../NoteForm/NoteForm";
import Main from "../Main/Main";
import Title from "../Title/Title";
import Home from "../Home/Home";
// import useLocalStorage from "../../hooks/useLocalStorage";
import { fetchNotes } from "../../services/notesService";
import Nav from "../Nav/Nav";
import { Toaster } from "react-hot-toast";

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
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const loadNotes = async () => {
      const data = await fetchNotes(currentUser.id);
      setNotes(data);
    };
    loadNotes();
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showMain = !isMobile || !isOpen;
  const showForm = (!isMobile && isOpen) || isOpen;

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes/:notesId?"
            element={
              <div className={css.container}>
                {showMain && (
                  <Main
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    notes={notes}
                    setNotes={setNotes}
                    currentUser={currentUser}
                  ></Main>
                )}
                <div className={css.wrapper}>
                  {!isMobile && (
                    <Nav
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  )}
                  {showForm && (
                    <>
                      {isMobile && (
                        <Title isOpen={isOpen} setIsOpen={setIsOpen} />
                      )}
                      <NoteForm
                        notes={notes}
                        setNotes={setNotes}
                        currentUser={currentUser}
                      />
                    </>
                  )}
                </div>
              </div>
            }
          />
          <Route path="*" element={<h1>PAGE NOT FOUND 404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
