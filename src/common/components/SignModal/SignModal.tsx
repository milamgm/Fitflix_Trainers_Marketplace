import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./SignModal.scss";
import {LoginForm, RegisterForm, useAppContext} from "../../../common/utilities/utils";

interface ISignModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignModal = ({ openModal, setOpenModal }: ISignModalProps) => {
  const {t} = useAppContext()
  const [signup, setSignup] = useState(false);

  //Switches between login and register form
  const showForm = () => {
    if (signup) {
      return <RegisterForm setOpenModal={setOpenModal} />;
    } else {
      return <LoginForm setOpenModal={setOpenModal} />;
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box className="sign_modal box-shadow">
          <div className="header">
            <div
              className={`tab ${!signup ? "active" : ""}`}
              role="button"
       
              onClick={() => setSignup(false)}
            >
              {t("signModal.login")}
            </div>
            <div
              className={`tab ${signup ? "active" : ""}`}
              role="button"
         
              onClick={() => setSignup(true)}
            >
              {t("signModal.signup")}
            </div>
          </div>
          <div className="body">
            <h3 className="title">{signup ? "Sign Up" : "Log In"}</h3>
            {showForm()}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SignModal;
