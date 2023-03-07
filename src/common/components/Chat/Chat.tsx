import Input from "./components/Input/Input";
import Messages from "./components/Messages/Messages";
import { useEffect, useState } from "react";
import { useChatContext } from "../../utilities/utils";
import { getChat } from "../../../application/api/retrieveData";

const Chat = () => {
  const { userChats, activeChat } = useChatContext();
  const [messages, setMessages] = useState([]);

  //Creates a chat id combining the uids from both participants
  const chatid = userChats.find(
    (chat) => chat.partner_uid === activeChat.partnerUid
  )!.chat_id;

  //Fetches messages of the specified chat
  const retrieveData = async (chatid: string) => {
    const chat = await getChat(chatid);
    setMessages(chat!.messages);
  };

  useEffect(() => {
    retrieveData(chatid);
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
