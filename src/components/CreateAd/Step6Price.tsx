import React, { useEffect } from "react";
import { TUpdateFields } from "../../types/types";

interface IStep6PriceProps {
  price: number;
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step6Price = ({
  price,
  updateFields,
  setActiveNextBtn,
}: IStep6PriceProps) => {
  //Adds inut to state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateFields({ price: value });
  };
//Activates forward button when the input value meets the specified requirements.
  useEffect(() => {
    const valid = price >= 1 && price <= 200;
    setActiveNextBtn(valid);
  }, [price]);

  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>Stundensatz</span>
        </h1>
        <p>Der maximale Preis ist 200€.</p>
      </div>
      <input
        className="number_input"
        type="number"
        placeholder="21"
        value={price}
        onChange={(e) => handleChange(e)}
      />
      <h3>€/Std.</h3>
    </div>
  );
};

export default Step6Price;
