import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addToDB = async (folder, id, data) => {
  await setDoc(doc(db, folder, id), data);
};

export const getUserData = async (email) => {
  const docRef = doc(db, "user_data", email);
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();

  return result;
};

// sets ad into user_data/postedAds
export const setAdToUserDoc = (data) => {
  const docRef = doc(db, "user_ads", data.uid);
  setDoc(
    docRef,
    {
      [data.aid]: {
        aid: data.aid,
        uid: data.uid,
        location: data.location,
        timeStamp: serverTimestamp(),
      },
    },
    { merge: true }
  );
};

// sets ad into ads_collection
export const setAdToAdsCollection = (location, data) => {
  const docRef = doc(db, "ads_collection", data.aid);
  setDoc(docRef, data , { merge: true });
};
