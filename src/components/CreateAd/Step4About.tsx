import { useEffect } from "react";
import { TUpdateFields } from "../../types/types";

interface IStep4AboutProps {
  about: string;
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step4About = ({
  about,
  updateFields,
  setActiveNextBtn,
}: IStep4AboutProps) => {
    //Activates forward button when input value meets the specified requirements.
  useEffect(() => {
    const valid = about.split(" ").filter((word) => word !== "").length >= 20;
    setActiveNextBtn(valid);
  }, [about]);

  return (
    <div className="step">
      <div className="step_title">
        <h1>
          Über <span>Dich</span>
        </h1>
        <p>(mindestens 20 Wörter)</p>
      </div>
      <textarea
        className="textarea_input"
        placeholder="Dies ist die Möglichkeit, um Deine zukünftigen Schülerinnen & Schüler davon zu überzeugen, dass Deine Methode einzigartig ist!"
        value={about}
        onChange={(e) => updateFields({ about: e.target.value })}
      />
    </div>
  );
};

export default Step4About;
