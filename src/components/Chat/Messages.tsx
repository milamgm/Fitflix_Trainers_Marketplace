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
      {messages.length === 0 && <h2>Wird geladen...</h2>}
    </div>
  );
};

export default Messages;
