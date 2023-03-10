import { useEffect, useState } from "react";
import { useChatContext, defaultPhoto } from "../../../../utilities/utils";
import { IPartnertData } from "../../../../types/types";
import "./PartnersList.scss";

const PartnersList = () => {
  const {
    partnertsData,
    setActiveChat,
    activeChat,
    displayMobilePartnersList,
    setDisplayMobilePartnersList,
  } = useChatContext();
  const [searchInput, setSearchInput] = useState("");
  const [displayChatsArr, setDisplayChatsArr] = useState<IPartnertData[]>([]);



  //Searchs the input string in partnertsData array
  useEffect(() => {
    const searchResult = partnertsData.filter((chat) =>
      chat.partnerName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setDisplayChatsArr(searchInput !== "" ? searchResult : partnertsData);
  }, [searchInput]);
  const selectPartner = (partner: IPartnertData) => {
    setActiveChat(partner);
    setDisplayMobilePartnersList(false);
    console.log(displayMobilePartnersList)
  };
  return (
    <div className="partners_list">
      <div className="search">
        <div className="searchForm">
          <input
            aria-label="searchInput"
            type="text"
            placeholder="Suchen"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="chats">
        {displayChatsArr.map((partner) => (
          <div
            role="button"
            key={partner.partnerUid}
            className={`${
              partner.partnerUid === activeChat.partnerUid ? "active" : ""
            } userChat`}
            onClick={() => selectPartner(partner)}
          >
            <img
              src={
                partner.partnerPic !== "" ? partner.partnerPic : defaultPhoto
              }
              alt={partner.partnerName}
            />
            <div className="userChatInfo">
              <span>{partner.partnerName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
