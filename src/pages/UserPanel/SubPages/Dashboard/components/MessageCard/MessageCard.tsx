import "./MessageCard.scss";
import { useNavigate } from "react-router-dom";
import { defaultPhoto, useChatContext } from "../../../../../../common/utilities/utils";

interface IMessageCardProps {
  partnerUid: string;
  partnerName: string;
  partnerPic: string;
}
const MessageCard = (data: IMessageCardProps) => {
  const navigate = useNavigate();
  const { setActiveChat } = useChatContext();
  
  const handleSelectChat = () => {
    setActiveChat(data);
    navigate("/benutzerpanel/nachrichten");
  };
  return (
    <div className="message_card" onClick={handleSelectChat}>
      <img
        src={data.partnerPic !== "" ? data.partnerPic : defaultPhoto}
        alt={data.partnerName}
      />
      <h3>{data.partnerName}</h3>
    </div>
  );
};

export default MessageCard;
