import { collection, getDocs, addDoc } from "firebase/firestore";
import { fireDataBase } from "../firebase";

export const fetchUsers = async () => {
  const usersCol = collection(fireDataBase, "users");
  const snapshot = await getDocs(usersCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createUser = async (name) => {
  const usersCol = collection(fireDataBase, "users");
  const docRef = await addDoc(usersCol, { name });
  return { id: docRef.id, name };
};
