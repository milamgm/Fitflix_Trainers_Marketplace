import React, { useEffect } from "react";
import { TUpdateFields } from "../../types/types";

interface IStep7PhoneProps {
  phone: number;
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Step7Phone = ({
  phone,
  updateFields,
  setActiveNextBtn,
}: IStep7PhoneProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateFields({ phone: value });
  };
  console.log(phone.toString().length);
  useEffect(() => {
    const valid = phone.toString().length >= 5 && phone.toString().length <= 20;
    setActiveNextBtn(valid);
  }, [phone]);
  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>Telefon </span>Nummer
        </h1>
        <p>
          Deine Nummer wird nicht auf der Website veröffentlicht, sie wird nur
          an die Schüler/innen übermittelt, denen Du Unterricht erteilen
          möchtest.
        </p>
      </div>
      <input
        className="phone_input"
        type="number"
        placeholder="4901557846484"
        value={phone}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Step7Phone;
