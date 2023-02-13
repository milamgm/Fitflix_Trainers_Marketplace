import { useEffect } from "react";
import { TUpdateFields } from "../../types/types";

interface IStep1AdTitleProps {
  title: string;
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step1AdTitle = ({
  title,
  updateFields,
  setActiveNextBtn,
}: IStep1AdTitleProps) => {

   //Activates forward button when input value meets the specified requirements.
  useEffect(() => {
    const wordsCount = title.split(" ").filter((word) => word !== "").length;
    const valid = wordsCount >= 5 && wordsCount <= 30;
    setActiveNextBtn(valid);
  }, [title]);

  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>Titel</span> deiner Anzeige
        </h1>
        <p>(mindestens 5 Wörter)</p>
      </div>
      <input
        className="text_input"
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => updateFields({ title: e.target.value })}
      />
    </div>
  );
};

export default Step1AdTitle;
