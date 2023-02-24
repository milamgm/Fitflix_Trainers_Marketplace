import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useClickOutside } from "../../utilities/utils";
import "./Dropdown.scss";

interface IDropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  listDB: string[];
}

const Dropdown = ({ value, setValue, listDB }: IDropdownProps) => {
  const [active, setActive] = useState(false);
  const [list, setList] = useState(listDB);

  //Closes dropdown when user clicks outside it
  let domNode = useClickOutside(() => {
    setActive(false);
  });
  //Searchs input value in dropdown list and displays it in case it exists
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    if (value !== "") {
      const list = listDB.filter((valueA) =>
        valueA.toLowerCase().includes(value.toLowerCase())
      );
      setList(list);
      setActive(list.length >= 1);
    }
  };

  return (
    <div className="dropdown" ref={domNode}>
      <div className="form__field">
        <input
          type="text"
          placeholder="Sportart wählen"
          className="form__input"
          value={value}
          onChange={(e) => handleSelect(e)}
        />
        <ExpandMoreIcon
          className="dropdown__icon"
          onClick={() => {
            setList(listDB);
            setActive((prev) => !prev);
          }}
        />
      </div>
      {active && (
        <div className="dropdown__body box-shadow">
          {list.map((option, ind) => (
            <div
              className="dropdown__option"
              key={ind}
              onClick={() => {
                setActive(false);
                setValue(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
