import "./Messages.scss";
import { Sidebar, Chat } from "../../../utilities/utils";
import { useChatContext } from "../../../context/ChatContext";

const Messages = () => {
  const { partnertsData } = useChatContext();
  return (
    <div className="container">
      {partnertsData.length >= 1 && (
        <>
          <Sidebar />
          <Chat />
        </>
      )}
      {partnertsData.length === 0 && (
        <div className="empty_div">
          <h3>Sie haben noch keine Nachrichten</h3>
        </div>
      )}
    </div>
  );
};

export default Messages;
