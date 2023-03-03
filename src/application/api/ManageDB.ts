import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../common/utilities/utils";
import { IAdData } from "../../common/types/types";
import { toast } from "react-hot-toast";
import { t } from "i18next";

//Sets document into database
export const addToDB = async (folder: string, id: string, data: any, merge: boolean = false) => {
  await setDoc(doc(db, folder, id), data, { merge: merge });
};

//Deletes document from database
export const deleteFromDB = async (collection: string, id: string) => {
  await deleteDoc(doc(db, collection, id))
}
