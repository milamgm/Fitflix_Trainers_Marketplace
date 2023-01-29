import { doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

export const sendMessage = async (e: React.SyntheticEvent, message, user, email) => {
  e.preventDefault();
  const date = new Date();
  const currentTime = date.getTime();

 
  const messageRef = doc(db, "user_data", email, "user_chats", user.email);
  const conversationExists = await getDoc(messageRef);

  if (conversationExists.exists()) {
    await updateDoc(messageRef, {
      [currentTime]: {
        message: message,
        time: currentTime,
      },
    });
  } else {
    await setDoc(messageRef, {
      email: user.email,
      [currentTime]: {
        message: message,
        time: currentTime,
      },
    });
  }
};