import { useEffect } from "react";
import { PhotoField, addPhoto, useAppContext } from "../../../utilities/utils";
import { TUpdateFields } from "../../../types/types";

interface IStep8PhotoProps {
  photo: string;
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Step8Photo = ({
  photo,
  updateFields,
  setActiveNextBtn,
}: IStep8PhotoProps) => {
  const { t } = useAppContext();

  //Activates forward button when an image has been selected
  useEffect(() => {
    setActiveNextBtn(photo !== "");
  }, [photo]);
  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>{t("steps.step8.title.span")} </span>{" "}
          {t("steps.step8.title.other")}
        </h1>
        <p>{t("steps.step8.description")} </p>
        <small>
          {t("steps.step8.small1")} <b> {t("steps.step8.bold1")} </b> <br />
          {t("steps.step8.small2")} <b> {t("steps.step8.bold2")} </b>
        </small>
      </div>
      <div className="photo_div">
        <PhotoField
          img={photo ? photo : addPhoto}
          imgType="adPhoto"
          updateFields={updateFields}
        />
      </div>
    </div>
  );
};

export default Step8Photo;
