import { fireDataBase } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const notesCollection = collection(fireDataBase, "notes");

export async function fetchNotes() {
    const snapshot = await getDocs(notesCollection);
    console.log("snapshot", snapshot);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createNote(note) {
  const docRef = await addDoc(notesCollection, note);
  return { id: docRef.id, ...note };
}

export async function updateNote(id, data) {
  const docRef = doc(fireDataBase, "notes", id);
  await updateDoc(docRef, data);
  return {id, ...data};
}

export async function deleteNote(id) {
  const docRef = doc(fireDataBase, "notes", id);
  await deleteDoc(docRef);
}