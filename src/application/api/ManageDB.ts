import { setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../common/utilities/utils";
import { IAdData } from "../../common/types/types";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { async } from "@firebase/util";

//Sets document into database
export const addToDB = async (
  folder: string,
  id: string,
  data: any,
  merge: boolean = false
) => {
  await setDoc(doc(db, folder, id), data, { merge: merge });
};

export const getFromDB = async (folder: string, id: string) => {
  let res = onSnapshot(folder, id, (doc) => {
    if (doc.data()) {
      const data = doc.data() as IAdData;
      return data;
    }
  });
  return res;
};

//Deletes document from database
export const deleteFromDB = async (collection: string, id: string) => {
  await deleteDoc(doc(db, collection, id));
};
