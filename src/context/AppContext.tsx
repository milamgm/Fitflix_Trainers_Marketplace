import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { IAppContext, IUserData } from "../types/types";
import { useLoadScript, LoadScriptProps } from "@react-google-maps/api";
const AppContext = createContext({} as IAppContext);
export const useAppContext = () => {
  return useContext(AppContext);
};
interface IAppProviderProps {
  children: JSX.Element;
}

const AppProvider = ({ children }: IAppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  //   const [places] = useState<string[]>(["places"]);
  const googleMapsLibraries: LoadScriptProps["libraries"] = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
    region: "de",
    language: "de",
  });
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== undefined) setUser(currentUser);
    });
    return authState;
  }, []);

  useEffect(() => {
    const getUserData = async (email: string) => {
      const docRef = doc(db, "user_data", email);
      onSnapshot(docRef, (doc) => {
        if (doc.data()) {
          const data = doc.data() as IUserData;
          setUserData(data);
        }
      });
    };
    if (user?.email) getUserData(user.email);
  }, [user]);

  const values = {
    user,
    setUser,
    userData,
    isLoaded,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
