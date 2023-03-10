import "./Messages.scss";
import {
  Sidebar,
  Chat,
  useChatContext,
  useAppContext,
} from "../../../../common/utilities/utils";
import PartnersList from "../../../../common/components/Chat/components/PartnersList";

const Messages = () => {
  const { t } = useAppContext();
  const { partnertsData } = useChatContext();
  return (
    <div className="container">
      {partnertsData.length >= 1 && (
        <>
          <div className="sidebar">
            <PartnersList />
          </div>
          <Chat />
        </>
      )}
      {partnertsData.length === 0 && (
        <div className="empty_div">
          <h3>{t("chat.messagesPage.noChats")}</h3>
        </div>
      )}
    </div>
  );
};

export default Messages;
