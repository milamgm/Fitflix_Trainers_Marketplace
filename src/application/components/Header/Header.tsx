import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import {
  SignModal,
  logo,
  useAppContext
} from "../../../common/utilities/utils";
import AvatarWrapper from "./components/AvatarWrapper";

const Header = () => {
  const navigate = useNavigate();
  const { user, userData } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  //Displays user wrapper in case is logged or a loging button if not
  const rightDiv = () => {
    if (user && userData) {
      return <AvatarWrapper userData={userData} />;
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

