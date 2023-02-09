import React, { useEffect } from "react";
import { TUpdateFields } from "../../types/types";

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
  useEffect(() => {
    const valid =
      description.split(" ").filter((word) => word !== "").length >= 20;
    setActiveNextBtn(valid);
  }, [description]);
  return (
    <div className="step">
      <div className="step_title">
        <h1>
          Über Deinen <span>Kurs</span>
        </h1>
        <p>(mindestens 20 Wörter)</p>
      </div>
      <textarea
        className="textarea_input"
        placeholder="Dies ist die Möglichkeit, um Deine zukünftigen Schülerinnen & Schüler davon zu überzeugen, dass Deine Methode einzigartig ist!"
        value={description}
        onChange={(e) => updateFields({ description: e.target.value })}
      />
    </div>
  );
};

export default Step3Descrip;
