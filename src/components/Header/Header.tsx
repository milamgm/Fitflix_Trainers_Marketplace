import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useAppContext } from "../../context/AppContext";
import SignModal from "../SignModal";
import { UserInfo } from "firebase/auth";
import logo from "../../../public/logo.svg";
import addIcon from "../../../public/add.svg";
import defaultUserAvatar from "../../../public/user.svg";

interface IAvatarWrapperProps {
  user: UserInfo;
}

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  const rightDiv = () => {
    if (user) {
      return <AvatarWrapper user={user} />;
    } else {
      return <button onClick={() => setOpenModal(true)}>Einloggen</button>;
    }
  };

  return (
    <header>
      <img
        className="logo"
        src={logo}
        width="150"
        alt="logo"
        onClick={() => navigate("/")}
      />
      {rightDiv()}
      <SignModal openModal={openModal} setOpenModal={setOpenModal} />
    </header>
  );
};

export default Header;

const AvatarWrapper = ({ user }: IAvatarWrapperProps) => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="right_div">
      <img
        src={addIcon}
        width={38}
        onClick={() => navigate("/anzeigeaufgeben")}
      />
      <div
        className="avatar_wrapper"
        onClick={() => setOpenProfileMenu((prev) => !prev)}
      >
        {openProfileMenu ? <h3>&#x2715;</h3> : <h3>&#9776;</h3>}
        <img
          className="avatar"
          src={user.photoURL! ?? defaultUserAvatar}
          alt={user.displayName!}
        />
      </div>
      {openProfileMenu && (
        <ProfileMenu setOpenProfileMenu={setOpenProfileMenu} />
      )}
    </div>
  );
};
