import { useEffect } from "react";
import { TUpdateFields } from "../../../types/types";
import { useAppContext } from "../../../utilities/utils";

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
  const { t } = useAppContext();

  //Activates forward button when input value meets the specified requirements.
  useEffect(() => {
    const valid = about.split(" ").filter((word) => word !== "").length >= 20;
    setActiveNextBtn(valid);
  }, [about]);

  return (
    <div className="step">
      <div className="step_title">
        <h1>
          {t("steps.step4.title.other")}
          <span>{t("steps.step4.title.span")}</span>
        </h1>
        <p>{t("steps.step4.description")}</p>
      </div>
      <textarea
        className="textarea_input"
        placeholder={t("steps.step4.placeholder")!}
        value={about}
        onChange={(e) => updateFields({ about: e.target.value })}
      />
    </div>
  );
};

export default Step4About;
