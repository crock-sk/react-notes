// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router";
// import css from "./App.module.css";
// import NoteForm from "../NoteForm/NoteForm";
// import Main from "../Main/Main";
// import Title from "../Title/Title";
// import Home from "../Home/Home";
// // import useLocalStorage from "../../hooks/useLocalStorage";
// import { fetchNotes } from "../../services/notesService";
// import Nav from "../Nav/Nav";
// import { Toaster } from "react-hot-toast";

// // const initialNotes = [
// //   { id: "1", title: "Note 1", content: "Content 1" },
// //   { id: "2", title: "Note 2", content: "Content 2" },
// //   { id: "3", title: "Note 3", content: "Content 3" },
// //   { id: "4", title: "Note 4", content: "Content 4" },
// //   { id: "5", title: "Note 5", content: "Content 5" },
// //   { id: "6", title: "Note 6", content: "Content 6" },
// // ];

// function App() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [currentUser, setCurrentUser] = useState('');
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     if (!currentUser) return;
//     const loadNotes = async () => {
//       const data = await fetchNotes(currentUser.id);
//       setNotes(data);
//     };
//     loadNotes();
//   }, [currentUser]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const showMain = !isMobile || !isOpen;
//   const showForm = (!isMobile && isOpen) || isOpen;

//   return (
//     <>
//       <Toaster />
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Home setCurrentUser={setCurrentUser} currentUser={currentUser} />
//             }
//           />
//           <Route
//             path="/notes/:notesId?"
//             element={
//               <div className={css.container}>
//                 {showMain && (
//                   <Main
//                     isOpen={isOpen}
//                     setIsOpen={setIsOpen}
//                     notes={notes}
//                     setNotes={setNotes}
//                     currentUser={currentUser}
//                   ></Main>
//                 )}
//                 <div className={css.wrapper}>
//                   {!isMobile && (
//                     <Nav
//                       currentUser={currentUser}
//                       setCurrentUser={setCurrentUser}
//                     />
//                   )}
//                   {showForm && (
//                     <>
//                       {isMobile && (
//                         <Title isOpen={isOpen} setIsOpen={setIsOpen}  userName={currentUser?.name}/>
//                       )}
//                       <NoteForm
//                         notes={notes}
//                         setNotes={setNotes}
//                         currentUser={currentUser}
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>
//             }
//           />
//           <Route path="*" element={<h1>PAGE NOT FOUND 404</h1>} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
                <Home
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
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
}) {
  const { notesId } = useParams();
  const location = useLocation();

  let titleText = "Notes";
  if (notesId) {
    const note = notes.find((note) => note.id === notesId);
    titleText = note?.title || "Edit Note";
  } else if (location.pathname.startsWith("/notes") && currentUser?.name) {
    titleText = currentUser.name;
  } else if (location.pathname === "/") {
    titleText = "My Notes App";
  }

  return (
    <div className={css.container}>
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
        {isMobile ? (
          <Title isOpen={isOpen} setIsOpen={setIsOpen} text={titleText} />
        ) : (
          <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
