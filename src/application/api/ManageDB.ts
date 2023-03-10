import { setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../common/utilities/utils";

//Sets document into database
export const addToDB = async (
  folder: string,
  id: string,
  data: any,
  merge: boolean = false
) => {
  await setDoc(doc(db, folder, id), data, { merge: merge });
};


//Deletes document from database
export const deleteFromDB = async (collection: string, id: string) => {
  await deleteDoc(doc(db, collection, id));
};
