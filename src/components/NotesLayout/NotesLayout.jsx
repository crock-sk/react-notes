import { useLocation, useParams } from "react-router";
import css from "./NotesLayout.module.css";
import NoteForm from "../NoteForm/NoteForm";
import Main from "../Main/Main";
import Nav from "../Nav/Nav";
import Title from "../Title/Title";

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

export default NotesLayout;
