import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { addToDB } from "./AddToDB";

export const registerAccount = (name, email, password) => {
  
  createUserWithEmailAndPassword(auth, email, password);
  updateProfile(auth.currentUser!, {
    displayName: name,
    photoURL: "",
  });
  const userData = {
    uid: auth.currentUser!.uid,
    name: name,
    profilePic: "",
    email: email
  };
  addToDB("user_data", auth.currentUser!.uid, userData);
};

export const LogOut = () => {
  const navigate = useNavigate();
  navigate("/");
  signOut(auth);
};
