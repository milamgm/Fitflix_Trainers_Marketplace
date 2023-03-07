import React, { useState } from "react";
import { arrayUnion, Timestamp } from "firebase/firestore";
import { addToDB } from "../../../../application/api/ManageDB";
import { useAppContext } from "../../../../application/context/AppContext";
import { toast } from "react-hot-toast";
import SignModal from "../../../../common/components/SignModal";
import { v4 } from "uuid";
import { done } from "../../../../common/utilities/utils";
import { IAdData, IUserData } from "../../../../common/types/types";

interface Props {
  adData: IAdData;
  trainer: IUserData;
}

const ContactForm = ({ adData, trainer }: Props) => {
  const { user, t } = useAppContext();
  const [message, setMessage] = useState("");
  const [contacted, setContacted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { aid } = adData;
  const { uid: trainerUid, name: trainerName } = trainer;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    //Creates a chat id combining uids of both participants
    if (message !== "") {
      const chatid =
        user!.uid > trainerUid
          ? user!.uid + trainerUid
          : trainerUid + user!.uid;
      try {
        //Sets the partnert´s uid as well as chat id and ad id in the current user's "user_chats" table.
        const dataToUser = {
          [trainerUid]: {
            chat_id: chatid,
            partner_uid: trainerUid,
            aid: aid,
          },
        };
        addToDB("user_chats", user!.uid, dataToUser, true);

        //Sets the current user's uid as well as chat id and ad id in the partnerts's "user_chats" table.
        const dataToPartner = {
          [user!.uid]: {
            chat_id: chatid,
            partner_uid: user!.uid,
            aid: aid,
          },
        };
        addToDB("user_chats", trainerUid, dataToPartner, true);

        //Sets chat information in "chats" table
        const dataToChats = {
          messages: arrayUnion({
            id: v4(),
            message,
            sender_uid: user!.uid,
            date: Timestamp.now(),
          }),
        };
        addToDB("chats", chatid, dataToChats, true);

        //Resets message string and displays success field
        setMessage("");
        toast.success(t("trainer.toastSuccess"), {
          duration: 3000,
        });
        setContacted(true);
      } catch (error) {
        toast.error(t("global.toastError"));
      }
    }
  };

  return (
    <>
      <div className="chat_widget">
        {!contacted && (
          <>
            <h3>{t("trainer.bookNow")}</h3>
            <p>
              {t("trainer.about")} {trainerName}{" "}
              {t("trainer.contactNoAccoutBtn")}
            </p>
            {user && (
              <form onSubmit={(e) => handleSend(e)}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    t("trainer.contactPlaceholder") + trainerName.split(" ")[0]
                  }
                ></textarea>
                <button type="submit">{t("trainer.contactBtn")}</button>
              </form>
            )}
            {!user && (
              <button onClick={() => setOpenModal(true)}>
                {t("trainer.contactTitle")}
              </button>
            )}
          </>
        )}
        {contacted && (
          <div className="message_sent">
            <img src={done} alt="" />
            {t("trainer.contactDone")}
          </div>
        )}
      </div>
      <SignModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ContactForm;
