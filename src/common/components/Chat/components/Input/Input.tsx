import { arrayUnion, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { v4 } from "uuid";
import { sendImg, db, useAppContext, addToDB } from "../../../../utilities/utils";

interface Props {
  chatid: string;
}

const Input = ({ chatid }: Props) => {
  const { user } = useAppContext();
  const [message, setMessage] = useState("");

  //Sets the input message in the database
  const handleSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        messages: arrayUnion({
          id: v4(),
          message,
          sender_uid: user!.uid,
          date: Timestamp.now(),
        }),
      }
      addToDB("chats", chatid, messageData, true)
      setMessage("");
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Schreiben Sie etwas..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend(e);
        }}
      />
      <div className="send">
        <img className="send_btn" onClick={handleSend} src={sendImg} alt="" />
      </div>
    </div>
  );
};

export default Input;
