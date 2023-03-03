import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserData } from "../../../../../common/types/types";
import {
    addIcon,
    ProfileMenu
} from "../../../../../common/utilities/utils";

interface IAvatarWrapperProps {
    userData: IUserData;
  }

const AvatarWrapper = ({ userData }: IAvatarWrapperProps) => {
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
                <img className="avatar" src={userData.profilePic} alt={userData.name} />
            </div>
            {openProfileMenu && (
                <ProfileMenu setOpenProfileMenu={setOpenProfileMenu} />
            )}
        </div>
    );
};

export default AvatarWrapper