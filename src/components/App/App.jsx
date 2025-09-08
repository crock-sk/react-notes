import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router";
import css from "./App.module.css";
import NoteForm from "../NoteForm/NoteForm";
import Main from "../Main/Main";
import Title from "../Title/Title";
import Home from "../Home/Home";
import { fetchNotes } from "../../services/notesService";
import Nav from "../Nav/Nav";
import { Toaster } from "react-hot-toast";
import AddBtn from "../AddBtn/AddBtn";
import Modal from "../Modal/Modal";
import UserList from "../UserList/UserList";
import UserForm from "../UserForm/UserForm";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

function NotesLayout({
  isOpen,
  setIsOpen,
  notes,
  setNotes,
  currentUser,
  setCurrentUser,
  isMobile,
  showMain,
  showForm,
  isModalOpen,
  setIsModalOpen,
}) {
  const { notesId } = useParams();
  const location = useLocation();

  let titleText = "Notes";
  let showBack = false;

  if (notesId) {
    const note = notes.find((note) => note.id === notesId);
    titleText = note?.title || "Edit Note";
    showBack = true;
  } else if (location.pathname.startsWith("/notes") && currentUser?.name) {
    titleText = currentUser.name;
    showBack = true;
  } else if (location.pathname === "/") {
    titleText = "My Notes App";
    showBack = false;
  }

  return (
    <div className={css.container}>
      {isMobile && (
        <Title text={titleText} showBack={showBack} setIsOpen={setIsOpen} />
      )}
      {showMain && (
        <Main
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          notes={notes}
          setNotes={setNotes}
          currentUser={currentUser}
        />
      )}
      <div className={css.wrapper}>
        {!isMobile && (
          <Nav
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {showForm && (
          <NoteForm
            notes={notes}
            setNotes={setNotes}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
