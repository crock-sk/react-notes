import css from "./NoteForm.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function NoteForm({ notes, setNotes }) {
  const { notesId } = useParams();
  const [showMessage, setShowMessage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useEffect(() => {
  //     setTitle(activeNote.title || "");
  //     setNote(activeNote.note || "");
  // }, [activeNote]);

  const note = notes.find((note) => note.id == notesId);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);



  const handleBlur = () => {
    if (!title.trim() && !content.trim()) return;

    const updatedNote = {
      id: notesId,
      title: title.trim(),
      content: content.trim(),
    };

    if (note) {
      setNotes((prev) =>
        prev.map((note) => (note.id === notesId ? updatedNote : note))
      );
    } else {
      setNotes((prev) => [...prev, updatedNote]);
      // setActiveNote(updatedNote);
    }

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className={css.wrapper}>
      <form className={css.form}>
        {showMessage && <p className={css.message}>Saved!</p>}
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Note</label>
          <textarea
            id="content"
            name="content"
            placeholder="Your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleBlur}
            className={css.textarea}
          />
        </div>
      </form>
    </div>
  );
}
