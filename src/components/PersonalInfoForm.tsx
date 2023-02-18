import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAppContext } from "../context/AppContext";
import ReauthModal from "./ReauthModal/ReauthModal";
import toast from "react-hot-toast";
import { addToDB } from "../api/ManageDB";
import { validateEmail } from "../utilities/formValidation";
import { IPersonalInfoForm } from "../types/types";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const personalInfoFormFields = [
  {
    inputName: "Name",
    type: "text",
    required: true,
    keyValue: "input_name",
    icon: <FaUserAlt />,
  },
  {
    inputName: "Telefon",
    type: "text",
    required: false,
    keyValue: "input_phoneNumber",
    icon: <BsFillTelephoneFill />,
  },
];

const PersonalInfoForm = () => {
  const { user, setUser, userData } = useAppContext();
  const [openReauthModal, setOpenReauthModal] = useState(false);
  const { uid } = user!;
  const { name, phoneNumber } = userData!;
  const [values, setValues] = useState<IPersonalInfoForm>({
    input_name: name,
    input_phoneNumber: phoneNumber,
  });

  const { input_name, input_phoneNumber } = values;
  const activeSubmitBtn =
    JSON.stringify([input_name, input_phoneNumber]) !==
    JSON.stringify([name, phoneNumber]);
    
//Updates user information in firebase auth as well as in user_data table
  const handleSubmit = async () => {
    try {
      updateProfile(auth.currentUser!, {
        displayName: input_name,
      });
      const userUpdatedData = {
        ...userData,
        name: input_name,
        phoneNumber: input_phoneNumber !== null ? input_phoneNumber : "",
      };
      addToDB("user_data", uid, userUpdatedData);
      toast.success("Daten wurden erfolgreich aktualisiert");
      setUser(user);
    } catch (err) {
      toast.error(err + " ERROR");
    }
  };
  return (
    <div>
      <form>
        {personalInfoFormFields.map(
          ({ inputName, type, required, keyValue, icon }) => (
            <div className="form__field" key={keyValue}>
              {icon}&nbsp;
              <input
                type={type}
                name={keyValue}
                placeholder={inputName}
                required={required}
                value={values[keyValue as keyof IPersonalInfoForm] ?? ""}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          )
        )}
      </form>
      <button
        className={` btn ${activeSubmitBtn ? "" : "disabled"}`}
        disabled={!activeSubmitBtn}
        onClick={handleSubmit}
      >
        Aktualisieren
      </button>
    </div>
  );
};

export default PersonalInfoForm;
