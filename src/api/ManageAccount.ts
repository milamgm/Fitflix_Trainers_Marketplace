import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { addToDB } from "./ManageDB";

export const registerAccount = async (
  name: string,
  email: string,
  password: string
) => {
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
