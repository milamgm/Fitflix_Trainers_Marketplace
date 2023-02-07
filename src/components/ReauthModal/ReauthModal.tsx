import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import "./ReauthModal.scss";

interface IReauthModalProps {
  openReauthModal: boolean;
  setOpenReauthModal: React.Dispatch<React.SetStateAction<boolean>>;
  inputEmail: string;
  deleteAccount: boolean;
}

const ReauthModal = ({
  openReauthModal,
  setOpenReauthModal,
  inputEmail,
  deleteAccount,
}: IReauthModalProps) => {
  const [authPass, setAuthPass] = useState("");

  const handleAuth = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const credential = EmailAuthProvider.credential(
      auth.currentUser!.email!,
      authPass
    );
    reauthenticateWithCredential(auth.currentUser!, credential)
      .then(() => {
        if (!deleteAccount) {
          updateEmail(auth.currentUser!, inputEmail);
          toast.success("Ihr Email wurde erfolgreich aktualisiert");
        } else {
          deleteUser(auth.currentUser!);
          deleteDoc(doc(db, "user_data", auth.currentUser!.uid!));
          toast.success("Ihr Konto wurde erfolgreich gelösch");
        }
        setOpenReauthModal(false);
      })
      .catch((e) => {
        if (e.message === "Firebase: Error (auth/wrong-password).")
          toast.error("Falsche Passwort");
      });
  };
  return (
    <>
      <Modal open={openReauthModal} onClose={() => setOpenReauthModal(false)}>
        <Box className="reauth_modal box-shadow">
          <div className="header">
            <h3>Passwort Wiederholen</h3>
          </div>
          <div className="body">
            <p>
              Wiederholen Sie Ihr Passwort, um Ihre Konto zu löschen.
            </p>
            <form>
              <input
                type="password"
                value={authPass}
                onChange={(e) => setAuthPass(e.target.value)}
              />
              <button onClick={(e) => handleAuth(e)}>Senden</button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ReauthModal;
