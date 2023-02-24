import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./SignModal.scss";
import {LoginForm, RegisterForm} from "../../../common/utilities/utils";

interface ISignModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignModal = ({ openModal, setOpenModal }: ISignModalProps) => {
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
              Log In
            </div>
            <div
              className={`tab ${signup ? "active" : ""}`}
              role="button"
         
              onClick={() => setSignup(true)}
            >
              Sign Up
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
