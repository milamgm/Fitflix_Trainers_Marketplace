import { useEffect, useRef } from "react";
import { useAppContext } from "../../../../utilities/utils";

interface Props {
  message: string;
  date: any;
  sender_uid: string;
}

const Message = ({ message, date, sender_uid }: Props) => {
  const timestamp = date.toDate().toLocaleString("de-De");
  const { user } = useAppContext();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  //Scrolls to the latest message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={lastMessageRef}
        className={`${
          sender_uid === user!.uid ? "currentUser" : "partner"
        } message`}
      >
        <div className="messageContent">
          <p>{message}</p>
          <small className="date">{timestamp}</small>
        </div>
      </div>
    </>
  );
};

export default Message;
