import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getUserData = async (email) => {
  const docRef = doc(db, "user_data", email);
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();

  return result;
};

// sets ad into user_data/postedAds
export const setAdToUserDoc = (email, data, rest) => {
  const docRef = doc(db, "user_data", email);
  updateDoc(docRef, {
    postedAds: { ...rest, [data.id]: data },
  });
};

// sets ad into ads_collection
export const setAdToAdsCollection = (location, data) => {
  const locality = location.split(",").slice(-2)[0];
  const docRef = doc(db, "ads_collection", locality);
  setDoc(docRef, { [data.id]: data }, { merge: true });
};

