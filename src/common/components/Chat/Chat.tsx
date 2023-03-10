import Input from "./components/Input/Input";
import Messages from "./components/Messages/Messages";
import { useEffect, useState } from "react";
import { chatPartnersSVG, db, useChatContext } from "../../utilities/utils";
import { getChat } from "../../../application/api/retrieveData";
import { IChat, IMessage } from "../../types/types";
import "./Chat.scss";
import PartnersList from "./components/PartnersList";
import { doc, onSnapshot } from "firebase/firestore";

const Chat = () => {
  const { userChats, activeChat, displayMobilePartnersList, setDisplayMobilePartnersList } = useChatContext();
  const [messages, setMessages] = useState<IMessage[]>([]);


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
        <div
          className="toggle_partner_list_btn only_mobile"
          onClick={() => setDisplayMobilePartnersList((prev: boolean) => !prev)}
        >
          <img src={chatPartnersSVG} alt="" />
        </div>
        <h4>{activeChat.partnerName}</h4>
      </div>

      <Messages messages={messages} />
      <Input chatid={chatid} />

      <div
        className="mobile_partner_list_menu only_mobile"
        style={{ display: `${displayMobilePartnersList ? "block" : "none"}` }}
      >
        <PartnersList/>
      </div>
    </div>
  );
};

export default Chat;
