const Sidebar = ({userChats, setActiveChat}) => {

  return (
    <div className="sidebar">
      <div className="search">
        <div className="searchForm">
          <input type="text" placeholder="Suchen" />
        </div>
      </div>
      <div className="chats">
       {userChats.map(( user) => (
          <div key={user.email} className="userChat" onClick={()=> setActiveChat(user)}>
            <img
              src={user.userPic}
              alt=""
            />
            <div className="userChatInfo">
              <span>{user.name}</span>
              <p>{user.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
