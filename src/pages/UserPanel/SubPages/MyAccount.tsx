import { useState } from "react";
import {
  useAppContext,
  ReauthModal,
  PersonalInfoWidget,
  PhotoField,
} from "../../../utilities/utils";
import persId from "../../../../public/certification.png";
import "./MyAccount.scss"

const MyAccount = () => {
  const [openReauthModal, setOpenReauthModal] = useState(false);

  const { userData } = useAppContext();
 
  const userCards = [
    {
      id: "personalangaben",
      title: "Personalangaben",
      content: <PersonalInfoWidget />,
    },
    {
      id: "zwischenzeugnis",
      title: "Arbeitszeugnis / Zwischenzeugnis",
      content: (
        <PhotoField img={userData!.userPersId ?? persId} imgType="userPersId" />
      ),
    },
    {
      id: "kontoLoeschen",
      title: "Konto löschen",
      content: (
        <div className="fixed__size">
          <p>
            <b>
              ACHTUNG! Sämtliche Daten (Kontakte, Anzeigen, Nachrichten ...)
              werden definitiv gelöscht und sind danach nicht wiederherstellbar.
            </b>
          </p>
          <button onClick={() => setOpenReauthModal(true)}>
            Konto Löschen
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="myaccount">
      {userCards.map(({ id, title, content }) => (
        <div key={id} className="half_card">
          <h2 className="title">{title}</h2>
          <div className="content">{content}</div>
        </div>
      ))}

      {openReauthModal && (
        <ReauthModal
          openReauthModal={openReauthModal}
          setOpenReauthModal={setOpenReauthModal}
          inputEmail=""
          deleteAccount={true}
        />
      )}
    </section>
  );
};

export default MyAccount;
