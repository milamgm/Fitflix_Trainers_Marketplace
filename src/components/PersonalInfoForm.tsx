import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAppContext } from "../context/AppContext";
import ReauthModal from "./ReauthModal/ReauthModal";
import toast from "react-hot-toast";
import { addToDB } from "../api/DBqueries";
import { validateEmail } from "../utilities/formValidation";
import { IPersonalInfoForm } from "../types/types";

const personalInfoFormFields = [
  {
    inputName: "Name",
    type: "text",
    required: true,
    keyValue: "input_name",
  },
  {
    inputName: "Telefon",
    type: "text",
    required: false,
    keyValue: "input_phoneNumber",
  },
];

const PersonalInfoForm = () => {
  const { user, setUser, userData } = useAppContext();
  const [openReauthModal, setOpenReauthModal] = useState(false);
  const { email } = user;
  const { name, phoneNumber } = userData;
  const [values, setValues] = useState<IPersonalInfoForm>({
    input_name: name,
    input_phoneNumber: phoneNumber,
  });

  const { input_name, input_phoneNumber } = values;
  const activeSubmitBtn =
    JSON.stringify([input_name, input_phoneNumber]) !==
    JSON.stringify([user.displayName,  user.phoneNumber]);

  const handleSubmit = async () => {
    try {
      updateProfile(auth.currentUser!, {
        displayName: input_name,
      });
      const userUpdatedData = {
        ...userData,
        name: input_name,
        phoneNumber: input_phoneNumber,
      };
      addToDB("user_data", email, userUpdatedData);
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
          ({ inputName, type, required, keyValue }) => (
            <div className="form__field" key={keyValue}>
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
        Senden
      </button>
    </div>
  );
};

export default PersonalInfoForm;
