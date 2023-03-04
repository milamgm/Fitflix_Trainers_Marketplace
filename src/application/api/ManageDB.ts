import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../common/utilities/utils";
import { IAdData } from "../../common/types/types";
import { toast } from "react-hot-toast";
import { t } from "i18next";

//Sets document into database
export const addToDB = async (folder: string, id: string, data: any, merge: boolean = false) => {
  await setDoc(doc(db, folder, id), data, { merge: merge });
};

<<<<<<< HEAD
//Deletes document from database
export const deleteFromDB = async (collection: string, id: string) => {
  await deleteDoc(doc(db, collection, id))
}
=======
//Sets ad into "ads_collection" document
export const setAdToAdsCollection = async (data: IAdData) => {
  const docRef = doc(db, "ads_collection", data.aid);
  await setDoc(docRef, data, { merge: true });
};

export const deleteFromDB = async (collection: string, id: string) => {
  try {
    // Delete from "ads_collection" document
    await deleteDoc(doc(db, collection, id));
    toast.success(t("adCard.toastSuccess"));
  } catch (err) {
    toast.error(t("global.toastError"));
  }
};
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
