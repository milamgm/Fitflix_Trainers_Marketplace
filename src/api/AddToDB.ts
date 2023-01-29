import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addToDB = async (folder, id, data) => {
  await setDoc(doc(db, folder, id), data);
};