import {
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { addToDB } from "../../api/ManageDB";
import { useAppContext } from "../../context/AppContext";
import { db } from "../../firebaseConfig";

interface IInputProps {
  chatid: string;
}

const Input = ({ chatid }: IInputProps) => {
  const { user } = useAppContext();
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message !== "") {
      const messagesRef = doc(db, "chats", chatid);
      await setDoc(
        messagesRef,
        {
          messages: arrayUnion({
            id: v4(),
            message,
            sender_uid: user!.uid,
            date: Timestamp.now(),
          }),
        },
        { merge: true }
      );
    }
    setMessage("");
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
        <img src="/image.svg" alt="" />
        <input type="file" style={{ display: "none" }} name="" id="" />
        <label htmlFor="file">
          <img src="/attach.svg" alt="" />
        </label>
        <img className="send_btn" onClick={handleSend} src="/send.svg" alt="" />
      </div>
    </div>
  );
};

export default Input;
