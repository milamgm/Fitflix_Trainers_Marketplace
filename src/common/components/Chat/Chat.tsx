import Input from "./components/Input";
import Messages from "./components/Messages";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useChatContext, db } from "../../utilities/utils";

const Chat = () => {
  const { userChats, activeChat } = useChatContext();
  const [messages, setMessages] = useState([]);

  //Creates a chat id combining the uids from both participants
  const chatid = userChats.find(
    (chat) => chat.partner_uid === activeChat.partnerUid
  )!.chat_id;

  //Fetches messages of the specified chat
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatid), (doc) => {
      doc.exists() && setMessages(doc.data()!.messages);
    });
    return unsub;
  }, [activeChat.partnerUid]);

  return (
    <div className="chat">
      <div className="chatInfo">
        <h4>{activeChat.partnerName}</h4>
      </div>
      <Messages messages={messages} />
      <Input chatid={chatid} />
    </div>
  );
};

export default Chat;
