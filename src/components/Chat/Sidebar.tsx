import { useEffect, useState } from "react";
import { useChatContext } from "../../context/ChatContext";
import profilePicDefault from "../../../public/user.svg";

const Sidebar = ({ setActiveChat, activeChat }) => {
  const { partnertsData } = useChatContext();
  const [searchInput, setSearchInput] = useState("");
  const [displayChatsArr, setDisplayChatsArr] = useState([]);

  useEffect(() => {
    const searchResult = partnertsData.filter((chat) =>
      chat.partnerName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setDisplayChatsArr(searchInput !== "" ? searchResult : partnertsData);
  }, [searchInput]);

  return (
    <div className="sidebar">
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Suchen"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="chats">
        {displayChatsArr.map((user) => (
          <div
            key={user.partnerUid}
            className={`${
              user.partnerUid === activeChat.partnerUid ? "active" : ""
            } userChat`}
            onClick={() => setActiveChat(user)}
          >
            <img
              src={user.partnerPic !== "" ? user.partnerPic : profilePicDefault}
              alt={user.uid}
            />
            <div className="userChatInfo">
              <span>{user.partnerName}</span>
              <p>{user.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
