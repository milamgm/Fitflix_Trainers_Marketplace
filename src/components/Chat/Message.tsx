
const Message = ({ messagesByTime }) => {
  const getMsgTime = (time) => {
    const msgDate = `${new Date(time).getDate()}.${
      new Date(time).getMonth() + 1
    }.${new Date(time).getFullYear()}`;
    const currentDate = `${new Date().getDate()}.${
      new Date().getMonth() + 1
    }.${new Date().getFullYear()}`;
    if (msgDate !== currentDate) {
      return msgDate;
    } else {
      return `${new Date(time).getHours()}:${(
        "0" + new Date(time).getMinutes()
      ).slice(-2)}`;
    }
  };
  return (
    <>
      {messagesByTime.map(({ time, message, image }) => (
        <div key={time} className="message">
          <div className="messageInfo">
            <img
              src="https://img.freepik.com/premium-photo/indignant-man-background_339295-62.jpg?w=740"
              alt=""
            />
            <span>
              <small>{getMsgTime(time)}</small>
            </span>
          </div>
          <div className="messageContent">
            <p>{message}</p>
            {image && (
              <img
                src="https://img.freepik.com/premium-photo/indignant-man-background_339295-62.jpg?w=740"
                alt=""
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Message;
