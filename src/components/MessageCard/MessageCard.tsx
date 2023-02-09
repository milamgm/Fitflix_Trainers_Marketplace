import "./MessageCard.scss";
import DefaultProfilePic from "../../../public/user.svg";

interface IMessageCardProps {
  partnerName: string;
  partnerPic: string;
}
const MessageCard = ({ partnerName, partnerPic }: IMessageCardProps) => {
  return (
    <div className="message_card">
      <img
        src={partnerPic !== "" ? partnerPic : DefaultProfilePic}
        alt={partnerName}
      />
      <h3>{partnerName}</h3>
    </div>
  );
};

export default MessageCard;
