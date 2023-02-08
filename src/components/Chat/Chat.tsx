import Input from "./Input";
import Messages from "./Messages";
import { useEffect, useState } from "react";
import { useChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Chat = ({ activeChat }) => {
  const { userChats } = useChatContext();
  const [messages, setMessages] = useState([]);

  const chatid = userChats.find(
    (chat) => chat.partner_uid === activeChat.partnerUid
  ).chat_id;
  
  useEffect(() => {
    onSnapshot(doc(db, "chats", chatid), (doc) => {
      setMessages(doc.data().messages);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chatInfo">
        <h4>{activeChat.partnerName}</h4>
        <div className="chatIcons">
          <img src="/more.svg" alt="more" />
        </div>
      </div>
      <Messages messages={messages} />
      <Input />
    </div>
  );
};

export default Chat;
