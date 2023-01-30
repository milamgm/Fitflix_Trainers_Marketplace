import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { addToDB } from "./DBqueries";

export const registerAccount = async (name, email, password) => {
  
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser!, {
    displayName: name,
    photoURL: "",
  });

  const userData = {
    uid: auth.currentUser!.uid,
    name: name,
    email: email,
    profilePic: "",
  };
  addToDB("user_data", auth.currentUser!.uid, userData);
};

export const LogOut = () => {
  const navigate = useNavigate();
  navigate("/");
  signOut(auth);
};
