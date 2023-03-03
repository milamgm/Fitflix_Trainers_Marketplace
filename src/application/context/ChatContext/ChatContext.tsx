import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { db } from "../../../common/utilities/utils";
import { IChatContext, IPartnertData, IUserChat } from "../../../common/types/types";
import { useAppContext } from "../AppContext";

export const ChatContext = createContext({} as IChatContext);
export const useChatContext = () => {
  return useContext(ChatContext);
};
interface IChatProviderProps {
  children: JSX.Element;
}

const ChatProvider = ({ children }: IChatProviderProps) => {
  const { user } = useAppContext();
  const [userChats, setUserChats] = useState<IUserChat[]>([]);
  const [partnertsData, setPartnertsData] = useState<IPartnertData[]>([]);
  const [activeChat, setActiveChat] =
    useState<IPartnertData>(partnertDataEmpty);

  //Fetches user chats
  useEffect(() => {
    const getChats = async () => {
      const userChatsRef = doc(db, "user_chats", user!.uid);
      const unsub = onSnapshot(userChatsRef, (doc) => {
        const res = doc.data();
        if (res) {
          setUserChats(Object.values(res));
        }
      });
      return () => {
        unsub();
      };
    };

    user?.uid && getChats();
  }, [user?.uid]);

  //Fetches information from chat partnerts and sets the first one as active by default.
  useEffect(() => {
    if (userChats.length >= 1) {
      const arr: IPartnertData[] = [];
      userChats.forEach((chat) => {
        const userRef = doc(db, "user_data", chat.partner_uid);
        const unsub = onSnapshot(userRef, (user) => {
          const res = user.data();
          arr.push({
            partnerUid: res!.uid,
            partnerName: res!.name,
            partnerPic: res!.profilePic,
          });
          setPartnertsData(arr);
          setActiveChat(arr[0]);
        });

        return () => {
          unsub();
        };
      });
    }
  }, [userChats]);

  const values = {
    partnertsData,
    userChats,
    setUserChats,
    activeChat,
    setActiveChat,
  };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export default ChatProvider;

const partnertDataEmpty = {
  partnerName: "",
  partnerPic: "",
  partnerUid: "",
};
