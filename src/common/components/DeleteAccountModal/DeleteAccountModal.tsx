import { Modal, Typography, Box } from "@mui/material";
import { deleteUser } from "firebase/auth";
import React from "react";
import { auth } from "../../utilities/utils";

interface IDeleteAccountModalProps {
  openDeleteAccountModal: boolean;
  setOpenDeleteAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteAccountModal = ({
  openDeleteAccountModal,
  setOpenDeleteAccountModal,
}: IDeleteAccountModalProps) => {
  const handleSubmit = () => {
    deleteUser(auth.currentUser!);
  };
  return (
    <>
      <Modal
        open={openDeleteAccountModal}
        onClose={() => setOpenDeleteAccountModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal box-shadow">
          <Typography className="modal__title">Passwort Wiederholen</Typography>
          <div className="modal__body__info">
            <p>
              Wiederholen Sie Ihr Passwort, um Ihre E-Mail zu aktualisieren.
            </p>
            <button onClick={handleSubmit}>Löschen</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteAccountModal;
