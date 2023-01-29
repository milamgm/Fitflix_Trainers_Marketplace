import { useState } from "react";
import "./Banner.scss";
import MobileSearch from "../MobileSearch/MobileSearch";
import SearchBox from "../SearchBox/SearchBox";

const Banner = () => {
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  return (
    <div className="banner">
      {!openSearchMenu && (
        <div className="content">
          <h1 className="title">Finden Sie Ihr idealer Lehrer</h1>
          <h3 className="subtitle">
            Online oder vor Ort, jetzt Termin vereinbaren!
          </h3>
          <SearchBox />
          <button
            className="only_mobile"
            onClick={() => setOpenSearchMenu(true)}
          >
            Jetzt Finden
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
