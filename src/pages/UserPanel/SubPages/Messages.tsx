import "./Messages.scss";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { Sidebar, Chat, useAppContext } from "../../../utilities/utils";

const Messages = () => {
  const { user } = useAppContext();
  const [userChats, setUserChats] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  useEffect(() => {
    const getChats = async () => {
      const q = query(collection(db, "user_data", user.email, "user_chats"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docc) => {
        let data = docc.data();
        const userRef = doc(db, "user_data", data.email);
        onSnapshot(userRef, (user) => {
          const userName = user.data().name;
          const userPic = user.data().profilePic;
          setUserChats((prev) => [
            ...prev,
            { ...data, name: userName, userPic: userPic },
          ]);
        });
      });
    };
    getChats();
  }, []);

  return (
    <div className="container">
      <Sidebar userChats={userChats} setActiveChat={setActiveChat} />
      <Chat activeChat={activeChat} />
    </div>
  );
};

export default Messages;
