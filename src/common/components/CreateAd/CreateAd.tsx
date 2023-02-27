import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  setAdToAdsCollection,
  useAppContext,
  useMultistepForm,
} from "../../../common/utilities/utils";
import { IAdData } from "../../types/types";
import {
  Step1AdTitle,
  Step2SelectCat,
  Step3Descrip,
  Step4About,
  Step5Location,
  Step6Price,
  Step7Phone,
  Step8Photo,
} from "./Steps";
import { v4 } from "uuid";
import AdConfirmation from "./AdConfirmation";

interface ICreateAdProps {
  editDataParams: { editData: IAdData };
}

const CreateAd = ({ editDataParams }: ICreateAdProps) => {
  const { user, t } = useAppContext();
  const editDataC = editDataParams?.editData;
  const INITIAL_DATA: IAdData = {
    aid: "",
    uid: "",
    title: "",
    categories: [],
    description: "",
    about: "",
    location: "",
    available: [],
    price: 0,
    phone: 0,
    photo: "",
  };
  const [data, setData] = useState(
    editDataC !== undefined ? editDataC : INITIAL_DATA
  );
  const [activeNextBtn, setActiveNextBtn] = useState(false);
  const navigate = useNavigate();

  //Updates ad information information in the state
  function updateFields(fields: { [key: string]: string | number | string[] }) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <Step1AdTitle
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step2SelectCat
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step3Descrip
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step4About
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step5Location
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step6Price
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step7Phone
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <Step8Photo
      {...data}
      updateFields={updateFields}
      setActiveNextBtn={setActiveNextBtn}
    />,
    <AdConfirmation data={data} />,
  ]);

  //When submit, if is not the last step, continues to the next one if so, sets the new ad into the database and navigates to user panel
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    } else {
      setAdToAdsCollection(data);
      toast.success(t("createAd.toastSuccess"));
      navigate("/benutzerpanel");
    }
  }

  //Ads uid and a new aid (if it does not exists yet) to the state
  useEffect(() => {
    if (isLastStep && editDataParams === undefined) {
      updateFields({ uid: user!.uid, aid: v4() });
    }
  }, [isLastStep]);

  return (
    <div className="step_div">
      <form onSubmit={onSubmit}>
        {step}
        <div>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Zurück
            </button>
          )}
          <button
            type="submit"
            disabled={!activeNextBtn}
            className={`${!activeNextBtn && "disabled"}`}
          >
            {isLastStep ? t("createAd.postAd") : t("createAd.continue")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;
