import { IMessage } from "../../../types/types";
import { useAppContext } from "../../../utilities/utils";
import Message from "./Message";

interface IMessagesPorps {
  messages: IMessage[];
}
const Messages = ({ messages }: IMessagesPorps) => {
  const {t} = useAppContext()
  return (
    <div className="messages">
      {messages.length >= 1 &&
        messages.map((msg) => <Message key={msg.id} {...msg} />)}
      {messages.length === 0 && <h2>{t("global.loading")}</h2>}
    </div>
  );
};

export default Messages;
