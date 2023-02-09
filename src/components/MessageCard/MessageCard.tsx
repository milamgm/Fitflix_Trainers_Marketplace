import "./MessageCard.scss";
import DefaultProfilePic from "../../../public/user.svg";
import { useChatContext } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";

interface IMessageCardProps {
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
        src={data.partnerPic !== "" ? data.partnerPic : DefaultProfilePic}
        alt={data.partnerName}
      />
      <h3>{data.partnerName}</h3>
    </div>
  );
};

export default MessageCard;
