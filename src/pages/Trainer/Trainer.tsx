import { useLocation } from "react-router-dom";
import {
  useAppContext,
  SignModal,
  BsFillTelephoneFill,
  AiFillFacebook,
  AiFillInstagram,
  SlSocialTwitter,
} from "../../utilities/utils";
import { useState } from "react";
import "./Trainer.scss";
import { sendMessage } from "../../scripts/sendMessage";

const Trainer = () => {
  const Routerlocation = useLocation();
  const { user } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const {
    title,
    email,
    trainerName,
    photo,
    categories,
    description,
    about,
    price,
    location,
  } = Routerlocation.state;

  return (
    <div className="page_body">
      <section>
        <div style={{ flex: "3" }}>
          <h1>{trainerName}</h1>
          Personal Trainer in {location}
          <div className="badges_div">
            {categories.map((cat: string) => (
              <div key={cat} className="badge">
                {cat}
              </div>
            ))}
          </div>
          <h2>{title}</h2>
          <p>
            <b>{about}</b>
          </p>
        </div>
        <div>
          <div style={{ flex: "1" }}>
            <img src={photo} alt={trainerName} />
          </div>
          <div>
            <h5>{trainerName}</h5>
            <h5>{title}</h5>
            <h5>Full Address</h5>
            <h5>
              <BsFillTelephoneFill />
              Telephone
            </h5>
          </div>
          <div>
            <AiFillFacebook />
            <AiFillInstagram />
            <SlSocialTwitter />
          </div>
          <div>
            <h3>Jetzt Buchen!</h3>
            <p>Jetzt Name kontaktieren und berraten zu lassen</p>
            <p>Eiqui vai o message widget</p>
            <button>Absenden</button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          {" "}
          <p>{description}</p>
        </div>
      </section>
      <section>
        {user && (
          <form
            className="message_card"
            onSubmit={(e) => sendMessage(e, message, user, email)}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Schreiben Sie Ihre Nachricht für ${
                trainerName.split(" ")[0]
              }.`}
            ></textarea>
            <button type="submit">Senden</button>
          </form>
        )}
        {!user && (
          <button onClick={() => setOpenModal(true)}>
            Jetzt Trainer kontaktieren
          </button>
        )}
      </section>
      <SignModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Trainer;
