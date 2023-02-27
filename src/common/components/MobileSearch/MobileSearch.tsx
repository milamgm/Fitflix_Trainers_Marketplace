import React, { useEffect, useState } from "react";
import categories from "../../data/categories.json";
import { Dropdown, PlacesAutocomplete, handleSearch, useAppContext } from "../../utilities/utils";
import "./MobileSearch.scss";
import { useNavigate } from "react-router-dom";

interface IMobileSearchProps {
  setOpenSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSearch = ({ setOpenSearchMenu }: IMobileSearchProps) => {
  const {t} = useAppContext()
  const [category, setCategory] = useState("");
  const [zone, setZone] = useState("");
  const navigate = useNavigate();

  //Switches between desktop and mobile search menu
  useEffect(() => {
    function handleWindowResize() {
      setOpenSearchMenu(getWindowSize().innerWidth <= 819);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      <div className="mobile_search">
        <div className="close_icon" onClick={() => setOpenSearchMenu(false)}>
          <b>&#x2715;</b>
        </div>
        <Dropdown value={category} setValue={setCategory} listDB={categories} />
        <PlacesAutocomplete setZone={setZone} />
        <button onClick={() => handleSearch(category, zone, navigate)}>
          {t("global.search")}
        </button>
      </div>
    </>
  );
};

export default MobileSearch;

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};
