import { fireDataBase } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const notesCollection = collection(fireDataBase, "notes");

export async function fetchNotes() {
  const snapshot = await getDocs(notesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createNote(note) {
  const docRef = await addDoc(notesCollection, note);
  return { id: docRef.id, ...note };
}

export async function updateNote(note) {
  const docRef = doc(fireDataBase, "notes", note.id);
  await setDoc(docRef, note); // setDoc перезаписывает документ
  return note;
}

export async function deleteNote(id) {
  const docRef = doc(fireDataBase, "notes", id);
  await deleteDoc(docRef);
}