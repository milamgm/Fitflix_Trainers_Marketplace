import React, { useEffect } from "react";
import { TUpdateFields } from "../../../types/types";
import { useAppContext } from "../../../utilities/utils";

interface IStep3DescripProps {
  description: string;
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step3Descrip = ({
  description,
  updateFields,
  setActiveNextBtn,
}: IStep3DescripProps) => {
  const { t } = useAppContext();

  //Activates forward button when input value meets the specified requirements.
  useEffect(() => {
    const valid =
      description.split(" ").filter((word) => word !== "").length >= 20;
    setActiveNextBtn(valid);
  }, [description]);
  return (
    <div className="step">
      <div className="step_title">
        <h1>
          {t("steps.step3.title.other")}
          <span> {t("steps.step3.title.span")}</span>
        </h1>
        <p> {t("steps.step3.description")}</p>
      </div>
      <textarea
        className="textarea_input"
        placeholder={t("steps.step3.placeholder")!}
        value={description}
        onChange={(e) => updateFields({ description: e.target.value })}
      />
    </div>
  );
};

export default Step3Descrip;
