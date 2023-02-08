import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useChatContext } from "../../context/ChatContext";

const Sidebar = ({setActiveChat}) => {
  const { partnertsData } = useChatContext();
  return (
    <div className="sidebar">
      <div className="search">
        <div className="searchForm">
          <input type="text" placeholder="Suchen" />
        </div>
      </div>
      <div className="chats">
        {partnertsData.map((user) => (
          <div
            key={user.partnerUid}
            className="userChat"
            onClick={() => setActiveChat(user)}
          >
            <img src={user.partnerPic} alt={user.uid} />
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
