import "./Messages.scss";
import { Sidebar, Chat, useChatContext } from "../../../common/utilities/utils";

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
