import React, { useEffect, useState } from "react";
import { validateRegister } from "../../utilities/formValidation";
import toast from "react-hot-toast";
import { registerAccount } from "../../api/ManageAccount";


interface IRegisterFormProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setOpenModal }: IRegisterFormProps) => {

  const [error, setError] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  //Validates form and registers account in case validation is successfull
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const name: string = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const repeatPassword = e.target[3].value;

    const result = validateRegister(name, email, password, repeatPassword);
    setValidationMessages(result);
    if (result.length === 0) {
      try {
        registerAccount(name, email, password);
        setOpenModal(false);
      } catch (err) {
        toast.error(
          "Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut"
        );
      }
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={`${
          validationMessages.find((item) => item.includes("Name"))
            ? "error"
            : ""
        }`}
        key="name"
        type="name"
        placeholder="Name"
      />
      <input
        key="email"
        type="text"
        placeholder="Email"
        className={`${
          validationMessages.find((item) => item.includes("Email"))
            ? "error"
            : ""
        }`}
      />
      <input
        key="password"
        type="password"
        placeholder="Passwort"
        className={`${
          validationMessages.find((item) => item.includes("Passwort"))
            ? "error"
            : ""
        }`}
      />
      <input
        key="repeatPassword"
        type="password"
        placeholder="Passwort Wiederholen"
        className={`${
          validationMessages.find((item) => item.includes("gleich"))
            ? "error"
            : ""
        }`}
      />
      <button>Anmelden</button>
      {error && (
        <div className="error_div">
          {validationMessages &&
            validationMessages.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
