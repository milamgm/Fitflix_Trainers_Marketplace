import { useAppContext } from "../../context/AppContext";

const Message = ({ id, message, date, sender_uid }) => {
  const timestamp = date.toDate().toLocaleString("de-De");
  const { user } = useAppContext();
  console.log(sender_uid)
  return (
    <>
      <div key={id} className={`${sender_uid === user!.uid ? "currentUser" : "partner"} message`}>
        <div className="messageContent">
          <p>{message}</p>
          {/*     {image && (
              <img
                src="https://img.freepik.com/premium-photo/indignant-man-background_339295-62.jpg?w=740"
                alt=""
              />
            )} */}
          <small className="date">{timestamp}</small>
        </div>
      </div>
    </>
  );
};

export default Message;
