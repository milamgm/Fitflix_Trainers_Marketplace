import React, { useEffect } from "react";
import { TUpdateFields } from "../../../types/types";
import { useAppContext } from "../../../utilities/utils";

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
const {t} = useAppContext()

  //Adds inut to state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateFields({ phone: value });
  };
  //Activates forward button when the input value meets the specified requirements.
  useEffect(() => {
    const valid = phone.toString().length >= 5 && phone.toString().length <= 20;
    setActiveNextBtn(valid);
  }, [phone]);
  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>{t("steps.step7.title.span")} </span>{t("steps.step7.title.other")}
        </h1>
        <p>
        {t("steps.step7.description")}
        </p>
      </div>
      <input
        className="phone_input"
        type="number"
        placeholder={t("steps.step7.placeholder")!}
        value={phone}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Step7Phone;
