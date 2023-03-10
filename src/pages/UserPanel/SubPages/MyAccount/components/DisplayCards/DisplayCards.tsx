import {
  PersonalInfoWidget,
  PhotoField,
  persId,
  useAppContext,
} from "../../../../../../common/utilities/utils";

interface Props {
  setOpenReauthModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayCards = ({ setOpenReauthModal }: Props) => {
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
    <>
      {userCards.map(({ id, title, content }) => (
        <div key={id} className="card">
          <h2 className="title">{title}</h2>
          <div className="content">{content}</div>
        </div>
      ))}
    </>
  );
};

export default DisplayCards;
