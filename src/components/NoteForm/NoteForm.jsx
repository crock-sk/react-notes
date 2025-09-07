import css from "./NoteForm.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  createNote,
  updateNote,
  deleteNote,
} from "../../services/notesService";
import toast from "react-hot-toast";


export default function NoteForm({ notes, setNotes, currentUser }) {
  const { notesId } = useParams();
  const [showMessage, setShowMessage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");

  const note = notes.find((note) => note.id == notesId);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setPriority(note?.priority || "");
  }, [note]);

  if (!currentUser) {
    toast.error("Please select or add a user first!");
  }

  const handleBlur = async () => {
    if (!title.trim() && !content.trim()) {
      if (note) {
        await deleteNote(currentUser.id, notesId);
        setNotes((prev) => prev.filter((note) => note.id !== notesId));
      }
      return;
    }

    const updatedNote = {
      title: title.trim(),
      content: content.trim(),
      priority: priority || "low",
    };

    if (note) {
      await updateNote(currentUser.id, notesId, updatedNote);
      setNotes((prev) =>
        prev.map((note) =>
          note.id === notesId ? { id: notesId, ...updatedNote } : note
        )
      );
    } else {
      const newNote = await createNote(currentUser.id, updatedNote);
      setNotes((prev) => [...prev, newNote]);
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
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            onBlur={handleBlur}
            className={`${css.select} ${
              priority ? css[priority] : css.placeholder
            }`}
            required
          >
            <option value="" disabled className={css.placeholder}>
              Priority
            </option>
            <option value="low" className={css.low}>
              Low
            </option>
            <option value="medium" className={css.medium}>
              Medium
            </option>
            <option value="high" className={css.high}>
              High
            </option>
          </select>
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
