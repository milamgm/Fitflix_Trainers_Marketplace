import { useEffect, useRef } from "react";
import { useAppContext } from "../../../utilities/utils";

interface IMessageProps {
  message: string;
  date: any;
  sender_uid: string;
}

const Message = ({ message, date, sender_uid }: IMessageProps) => {
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
          {/*     {image && (
              <img
                src="https://img.freepik.com/premium-photo/indignant-man-background_339295-62.jpg?w=740"
                alt=""
              />
            )} */}
          <small className="date">{timestamp}</small>
        </div>
      </div>
    </>
  );
};

export default Message;
