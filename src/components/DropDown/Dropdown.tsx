import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useClickOutside } from "../../hooks/useOnClickOutside";
import "./Dropdown.scss";

interface IDropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  listDB: string[];
}

const Dropdown = ({ value, setValue, listDB }: IDropdownProps) => {
  const [active, setActive] = useState(false);
  const [list, setList] = useState(listDB);

  let domNode = useClickOutside(() => {
    setActive(false);
  });

  useEffect(() => {
    list.length === 0 ? setActive(false) : setActive(true);
    if (value !== "") {
      setList(
        listDB.filter((valueA) =>
          valueA.toLowerCase().includes(value.toLowerCase())
        )
      );
      setActive(true);
    } else {
      setActive(false);
    }
  }, [value]);
  useEffect(() => {
    list.length === 0 ? setActive(false) : value !== "" ?? setActive(true);
  }, [list]);

  return (
    <div className="dropdown" ref={domNode}>
      <div className="form__field">
        <input
          type="text"
          placeholder="Sportart wählen"
          className="form__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
