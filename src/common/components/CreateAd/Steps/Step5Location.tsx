import { useEffect, useState } from "react";
import { PlacesAutocomplete, useAppContext } from "../../../utilities/utils";
import { TUpdateFields } from "../../../types/types";

interface IStep5LocationProps {
  location: string;
  available: string[];
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step5Location = ({
  available,
  updateFields,
  setActiveNextBtn,
}: IStep5LocationProps) => {
  const { t } = useAppContext();
  const options = [
    t("steps.step5.options.option1"),
    t("steps.step5.options.option2"),
    t("steps.step5.options.option3"),
  ];
  const [zone, setZone] = useState("");

  //Adds or removes opition in array
  const handleSelect = (option: string) => {
    if (!available.includes(option)) {
      updateFields({
        available: [...available, option],
      });
    } else {
      updateFields({
        available: available.filter((opt) => opt !== option),
      });
    }
  };
  //Extracts the city of the selected location
  useEffect(() => {
    updateFields({
      location: zone.split(",").slice(-2)[0],
    });
  }, [zone]);
  //Activates forward button when location and at least one option are selected.
  useEffect(() => {
    setActiveNextBtn(zone !== "" && available[0] !== undefined);
  }, [available[0], zone]);

  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>Standort </span> des Kurses
        </h1>
      </div>
      <div className="location_input">
        <PlacesAutocomplete setZone={setZone} />
      </div>
      <div className="checkbox_div">
        {options.map((option) => (
          <div
            key={option}
            className={`checkbox_card ${
              available.includes(option) ? "selected" : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            <label htmlFor={option}> {option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step5Location;
