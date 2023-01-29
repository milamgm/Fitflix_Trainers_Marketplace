import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useClickOutside } from "../hooks/useOnClickOutside";
import "../styles/components/Menus.scss";

interface IProfileMenuProps {
  setOpenProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProfileMenu = ({ setOpenProfileMenu }: IProfileMenuProps) => {
  const navigate = useNavigate();
  let domNode = useClickOutside(() => {
    setOpenProfileMenu(false);
  });
  const logOut = () => {
    navigate("/");
    signOut(auth);
    setOpenProfileMenu(false);
  };
  const menuItems = [
    { name: "Benutzerpanel", path: "benutzerpanel/dashboard" },
    { name: "Nachtrichten", path: "benutzerpanel/nachrichten" },
  ];
  return (
    <div className="profile__menu box-shadow" ref={domNode}>
      {menuItems.map(({ name, path }, ind) => (
        <Link
          key={path}
          style={{ textDecoration: "none" }}
          to={path}
          onClick={() => setOpenProfileMenu(false)}
        >
          <div className="profile__menu__item" key={ind}>
            {name}
          </div>
        </Link>
      ))}
      <div className="profile__menu__item logout" onClick={logOut}>
        Log Out
      </div>
    </div>
  );
};

export default ProfileMenu;
