import { useNavigate } from "react-router-dom";
import categories from "../../data/categories.json";
import { useState } from "react";
import Dropdown from "../DropDown/Dropdown";
import PlacesAutocomplete from "../PlacesAutocomplete";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBox.scss";
import { useAppContext, handleSearch } from "../../utilities/utils";

const SearchBox = () => {
  const { isLoaded } = useAppContext();
  let listDB = categories;
  const [category, setCategory] = useState("");
  const [zone, setZone] = useState("");
  const navigate = useNavigate();

  return (
    <div className="searchbox box-shadow">
      <form className="searchbox__content">
        <Dropdown setValue={setCategory} value={category} listDB={listDB} />
        {isLoaded ? (
          <PlacesAutocomplete setZone={setZone} />
        ) : (
          <div className="dropdown">
            <div className="form__field">Wird geladen...</div>
          </div>
        )}
        <div
          className="button"
          onClick={() => handleSearch(category, zone, navigate)}
        >
          <SearchIcon className="searchbox__button__icon" />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
