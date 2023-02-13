import { useEffect } from "react";
import PhotoField from "../PhotoField";
import { TUpdateFields } from "../../types/types";

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
  //Activates forward button when an image has been selected
  useEffect(() => {
    setActiveNextBtn(photo !== "");
  }, [photo]);
  return (
    <div className="step">
      <div className="step_title">
        <h1>
          <span>Profil</span> Foto
        </h1>
        <p>Dieses Foto wird auf all Deinen Anzeigen zu sehen sein.</p>
        <small>
          Format: <b>JPEG oder PNG</b>
          Dimensionen:<b>500minimum px</b>
          Größe: <b>LIMIT@Maximal mb</b>
        </small>
      </div>
      <div className="photo_div">
        <PhotoField
          img={photo ? photo : "./addPhoto.png"}
          imgType="adPhoto"
          updateFields={updateFields}
        />
      </div>
    </div>
  );
};

export default Step8Photo;
