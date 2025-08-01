import css from "./NoteForm.module.css";
import { useState, useEffect } from "react";

export default function NoteForm({ notes, setNotes, activeNote, setActiveNote }) {
  const [showMessage, setShowMessage] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
      setTitle(activeNote.title || "");
      setNote(activeNote.note || "");
  }, [activeNote]);

  const handleBlur = () => {
    if (!title.trim() && !note.trim()) return;

    const updatedNote = {
      ...activeNote,
      title: title.trim(),
      note: note.trim(),
    };

    if (notes.find((note) => note.id === updatedNote.id)) {
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    } else {
      setNotes((prev) => [...prev, updatedNote]);
      setActiveNote(updatedNote);
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
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            name="note"
            placeholder="Your content here"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleBlur}
            className={css.textarea}
          />
        </div>
      </form>
    </div>
  );
}
