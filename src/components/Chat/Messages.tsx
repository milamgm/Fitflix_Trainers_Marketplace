import Message from "./Message";

const Messages = ({ activeChat }) => {
  const activeChatCopy = structuredClone(activeChat);
  delete activeChatCopy.name;
  delete activeChatCopy.email;
  delete activeChatCopy.userPic;
  const messagesArr = Object.values(activeChatCopy);
  const messagesByTime = [...messagesArr].sort((a, b) => {
    return Number(new Date(a.time)) - Number(new Date(b.time));
  });
  console.log(messagesArr);
  return (
    <div className="messages">
      <Message messagesByTime={messagesByTime} />
    </div>
  );
};

export default Messages;
