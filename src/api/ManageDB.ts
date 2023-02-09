import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { IAdData } from "../types/types";

//sets document into database
export const addToDB = async (folder: string, id: string, data: any) => {
  await setDoc(doc(db, folder, id), data);
};

// sets ad into ads_collection
export const setAdToAdsCollection = async (data: IAdData) => {
  const docRef = doc(db, "ads_collection", data.aid);
  await setDoc(docRef, data, { merge: true });
};
