import { useAppContext } from "../../context/AppContext";
import Message from "./Message";

const Messages = ({ messages }) => {
  const { user } = useAppContext();
  return (
    <div className="messages">
      {messages.length >= 1 && messages.map((msg) => <Message key={msg.id} {...msg} />)}
    </div>
  );
};

export default Messages;
