import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import css from "./App.module.css";
import Title from "../Title/Title";
import Home from "../Home/Home";
import { fetchNotes } from "../../services/notesService";
import toast, { Toaster } from "react-hot-toast";
import AddBtn from "../AddBtn/AddBtn";
import Modal from "../Modal/Modal";
import UserForm from "../UserForm/UserForm";
import NotesLayout from "../NotesLayout/NotesLayout";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const loadNotes = async () => {
      try {
        const data = await fetchNotes(currentUser.id);
        setNotes(data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load notes");
      }
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
        <Route
          path="/"
          element={
            <>
              {isMobile && <Title text="My Notes App" />}
              {isMobile && (
                  <div className={css.buttonWrapper}>
                    <AddBtn
                      text={"Add User"}
                      handleAddClick={() => setIsModalOpen(true)}
                    />
                  </div>
              )}
              <Home
                setIsOpen={setIsOpen}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              {isMobile && isModalOpen && (
                <Modal
                  setIsModalOpen={setIsModalOpen}
                  setCurrentUser={setCurrentUser}
                >
                  <UserForm autoClose={true} onClose={setIsModalOpen} />
                </Modal>
              )}
            </>
          }
        />

        <Route
          path="/notes/:notesId?"
          element={
            <NotesLayout
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              notes={notes}
              setNotes={setNotes}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isMobile={isMobile}
              showMain={showMain}
              showForm={showForm}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />

        <Route path="*" element={<h1>PAGE NOT FOUND 404</h1>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
