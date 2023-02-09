import { useAppContext } from "../../context/AppContext";
import { IMessage } from "../../types/types";
import Message from "./Message";

interface IMessagesPorps {
  messages: IMessage[];
}
const Messages = ({ messages }: IMessagesPorps) => {
  return (
    <div className="messages">
      {messages.length >= 1 &&
        messages.map((msg) => <Message key={msg.id} {...msg} />)}
    </div>
  );
};

export default Messages;
