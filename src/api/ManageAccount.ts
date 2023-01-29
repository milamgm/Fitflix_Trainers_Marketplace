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
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: "",
  });
  const userData = {
    name: name,
    profilePic: "",
    postedAds: {},
  };
  addToDB("user_data", email, userData);
};

export const LogOut = () => {
  const navigate = useNavigate();
  navigate("/");
  signOut(auth);
};
