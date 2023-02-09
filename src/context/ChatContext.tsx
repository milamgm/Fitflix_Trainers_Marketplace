import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { db } from "../firebaseConfig";
import { IChatContext, IPartnertsData, IUserChats } from "../types/types";
import { useAppContext } from "./AppContext";

const ChatContext = createContext({} as IChatContext);
export const useChatContext = () => {
  return useContext(ChatContext);
};
interface IChatProviderProps {
  children: JSX.Element;
}

const ChatProvider = ({ children }: IChatProviderProps) => {
  const { user } = useAppContext();
  const [userChats, setUserChats] = useState<IUserChats[]>([]);
  const [partnertsData, setPartnertsData] = useState<IPartnertsData[]>([]);

  useEffect(() => {
    const getChats = async () => {
      const userChatsRef = doc(db, "user_chats", user!.uid);
      onSnapshot(userChatsRef, (doc) => {
        const res = doc.data();
        if (res) setUserChats(Object.values(res));
      });
    };

    if (user !== null) getChats();
  }, [user]);

  useEffect(() => {
    const unsub = async () => {
      if (userChats.length >= 1) {
        userChats.forEach((chat) => {
          const userRef = doc(db, "user_data", chat.partner_uid);
          onSnapshot(userRef, (user) => {
            const res = user.data();
            setPartnertsData((prev) => [
              ...prev,
              {
                partnerUid: res!.uid,
                partnerName: res!.name,
                partnerPic: res!.profilePic,
              },
            ]);
          });
        });
      }
    };
    unsub();
    return () => {
      unsub();
    };
  }, [userChats]);

  const values = { partnertsData, userChats };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
