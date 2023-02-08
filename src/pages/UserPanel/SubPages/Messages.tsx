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
import { useChatContext } from "../../../context/ChatContext";

const Messages = () => {
  const { partnertsData } = useChatContext();
  //TODO: in case no chats, set activechat
  const [activeChat, setActiveChat] = useState(
    partnertsData.length >= 1 ? partnertsData[0] : []
  );

  return (
    <div className="container">
      <Sidebar setActiveChat={setActiveChat} activeChat={activeChat}/>
      {partnertsData.length >= 1 && <Chat activeChat={activeChat} />}
    </div>
  );
};

export default Messages;
