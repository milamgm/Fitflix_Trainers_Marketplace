import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useOnClickOutside";
interface IProfileMenuProps {
  setOpenProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProfileMenu = ({ setOpenProfileMenu }: IProfileMenuProps) => {
  const navigate = useNavigate();
  //Closes menu when user clicks outside it
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
    <div className="profile_menu box-shadow" ref={domNode}>
      {menuItems.map(({ name, path }, ind) => (
        <Link
          key={path}
          style={{ textDecoration: "none" }}
          to={path}
          onClick={() => setOpenProfileMenu(false)}
        >
          <div className="item" key={ind}>
            {name}
          </div>
        </Link>
      ))}
      <div className="item logout" onClick={logOut}>
        Log Out
      </div>
    </div>
  );
};

export default ProfileMenu;
