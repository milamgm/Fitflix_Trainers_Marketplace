import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, useAppContext } from "../../../utilities/utils";
import React, { useState } from "react";

interface ILoginFormProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setOpenModal }: ILoginFormProps) => {
  const { t } = useAppContext();
  const [error, setError] = useState(false);

  //TODO: VALIDATION MESSAGES
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      signInWithEmailAndPassword(auth, email, password);
      setOpenModal(false);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input key="email" type="email" placeholder={t("signModal.email")!} />
      <input
        key="password"
        type="password"
        placeholder={t("signModal.password")!}
      />
      <button>{t("signModal.login")}</button>
      {error && <span>{t("global.toastError")}</span>}
    </form>
  );
};

export default LoginForm;
