import { setDoc, doc } from "firebase/firestore";
import { db } from "../../common/utilities/utils";
import { IAdData } from "../../common/types/types";

//Sets document into database
export const addToDB = async (folder: string, id: string, data: any) => {
  await setDoc(doc(db, folder, id), data);
};

//Sets ad into "ads_collection" document
export const setAdToAdsCollection = async (data: IAdData) => {
  const docRef = doc(db, "ads_collection", data.aid);
  await setDoc(docRef, data, { merge: true });
};
