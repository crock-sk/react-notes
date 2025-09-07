import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { fireDataBase } from "../firebase";

export const fetchNotes = async (userId) => {
  const notesCol = collection(fireDataBase, "users", userId, "notes");
  const snapshot = await getDocs(notesCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createNote = async (userId, note) => {
  const notesCol = collection(fireDataBase, "users", userId, "notes");
  const docRef = await addDoc(notesCol, note);
  return { id: docRef.id, ...note };
};

export const updateNote = async (userId, noteId, note) => {
  const noteRef = doc(fireDataBase, "users", userId, "notes", noteId);
  await updateDoc(noteRef, note);
};

export const deleteNote = async (userId, noteId) => {
  const noteRef = doc(fireDataBase, "users", userId, "notes", noteId);
  await deleteDoc(noteRef);
};
