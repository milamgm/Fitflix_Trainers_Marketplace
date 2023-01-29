import Input from "./Input";
import Messages from "./Messages";


const Chat = ({ activeChat }) => {
  const { name } = activeChat;
  console.log(activeChat)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{name}</span>
        <div className="chatIcons">
          <img src="/more.svg" alt="more" />
        </div>
      </div>
      <Messages activeChat={activeChat} />
      <Input />
    </div>
  );
};

export default Chat;
