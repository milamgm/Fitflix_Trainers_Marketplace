import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAdToAdsCollection } from "../../utilities/utils";
import { useAppContext } from "../../context/AppContext";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { IAdData } from "../../types/types";
import AdConfirmation from "./AdConfirmation";
import Step1AdTitle from "./Step1AdTitle";
import Step2SelectCat from "./Step2SelectCat";
import Step3Descrip from "./Step3Descrip";
import Step4About from "./Step4About";
import Step5Location from "./Step5Location";
import Step6Price from "./Step6Price";
import Step7Phone from "./Step7Phone";
import Step8Photo from "./Step8Photo";
import { v4 } from "uuid";

interface ICreateAdProps {
  editDataParams: { editData: IAdData };
}

const CreateAd = ({ editDataParams }: ICreateAdProps) => {
  const { user } = useAppContext();
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

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
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
      toast.success("Ihre Anzeige wurde erfolgreich veröffentlicht.");
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
            {isLastStep ? "Anzeige Stellen" : "Fortfahren"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;
