import { useState } from "react";
import "./Banner.scss";
import MobileSearch from "../MobileSearch/MobileSearch";
import SearchBox from "../SearchBox/SearchBox";
import { useAppContext } from "../../utilities/utils";

const Banner = () => {
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const { t } = useAppContext();
  return (
    <div className="banner">
      {!openSearchMenu && (
        <div className="content">
          <h1 className="title">{t("banner.title")}</h1>
          <h3 className="subtitle">{t("banner.subtitle")} </h3>
          <SearchBox />
          <button
            className="only_mobile"
            onClick={() => setOpenSearchMenu(true)}
          >
            {t("banner.button")}
          </button>
        </div>
      )}
      {openSearchMenu && (
        <div className="content only_mobile">
          <MobileSearch setOpenSearchMenu={setOpenSearchMenu} />
        </div>
      )}
      <div className="background" />
    </div>
  );
};

export default Banner;
