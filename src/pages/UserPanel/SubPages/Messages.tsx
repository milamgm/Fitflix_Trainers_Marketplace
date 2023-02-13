import "./Messages.scss";
import { useState } from "react";
import { Sidebar, Chat } from "../../../utilities/utils";
import { useChatContext } from "../../../context/ChatContext";
import { IPartnertData } from "../../../types/types";

const Messages = () => {
  const { partnertsData } = useChatContext();
  return (
    <div className="container">
      {partnertsData.length >= 1 && (
        <Sidebar />
      )}
      {partnertsData.length >= 1 && <Chat />}
      {partnertsData.length === 0 && (
        <div className="empty_div">
          <h3>Sie haben noch keine Nachrichten</h3>
        </div>
      )}
    </div>
  );
};

export default Messages;

const partnertDataEmpty = {
  partnerName: "",
  partnerPic: "",
  partnerUid: "",
};
