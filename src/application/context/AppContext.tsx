import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from"../../common/utilities/utils";
import { doc, onSnapshot } from "firebase/firestore";
import { IAppContext, IUserData } from "../../common/types/types";
import useMapsAPILoader from '../../common/hooks/useMapsApiLoader';
import defaultUserPic from "../../../public/user.svg";
import { useTranslation} from "react-i18next"

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
  const [t, i18n] = useTranslation("global")
  //   const [places] = useState<string[]>(["places"]);

  //Loads Google Maps API
  const { isLoaded } = useMapsAPILoader();
  //Fetches user log from firebase auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== undefined) setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);
  //Fethes user data from "user_data" table
  useEffect(() => {
    const getUserData = async (uid: string) => {
      const docRef = doc(db, "user_data", uid);
      const unsub = onSnapshot(docRef, (doc) => {
        if (doc.data()) {
          const data = doc.data() as IUserData;
          setUserData(
            data.profilePic !== ""
              ? data
              : { ...data, profilePic: defaultUserPic }
          );
        }
      });

      return () => {
        unsub();
      };
    };
    user?.uid && getUserData(user.uid);
  }, [user?.uid]);

  const values = {
    user,
    setUser,
    userData,
    isLoaded,
    t
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
