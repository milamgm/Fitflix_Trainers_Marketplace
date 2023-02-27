import { useEffect } from "react";
import { TUpdateFields } from "../../../types/types";
import { useAppContext } from "../../../utilities/utils";

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
  const { t } = useAppContext();
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
          <span>{t("steps.step1.title.span")}</span>
          {t("steps.step1.title.other")}
        </h1>
        <p>{t("steps.step1.description")}</p>
      </div>
      <input
        className="text_input"
        type="text"
        placeholder={t("steps.step1.placeholder")!}
        value={title}
        onChange={(e) => updateFields({ title: e.target.value })}
      />
    </div>
  );
};

export default Step1AdTitle;
