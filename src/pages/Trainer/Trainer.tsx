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
import defaultUserAvatar from "../../../public/user.svg";

const Trainer = () => {
  const Routerlocation = useLocation();
  const { user } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const {
    aid,
    uid,
    title,
    email,
    trainerName,
    trainerPic,
    trainerPhone,
    photo,
    categories,
    description,
    about,
    price,
    location,
  } = Routerlocation.state;

  return (
    <>
      <div className="ad_image">
        <img src={photo} alt={title} />
      </div>
      <div className="page_body">
        <div className="trainer">
          <div className="main_div">
            <h1>{title}</h1>
            <h3>Personal Trainer in {location}</h3>
            <div className="badges_div">
              {categories.map((cat: string) => (
                <div key={cat} className="badge">
                  {cat}
                </div>
              ))}
            </div>
            <div className="description_div">
              <h2>Über die Unterricht</h2>
              <hr />
              <p>{description}</p>
            </div>
            <div className="description_div">
              <h2>Über {trainerName}</h2>
              <hr />
              <p>{about}</p>
            </div>
          </div>
          <div className="second_div">
            <img
              className="avatar_photo"
              src={trainerPic !== "" ? trainerPic : defaultUserAvatar}
              alt={trainerName}
            />

            <h3>{trainerName}</h3>
            {trainerPhone !== "" && (
              <div className="phone_div">
                <BsFillTelephoneFill />
                <h4>{trainerPhone}</h4>
              </div>
            )}
            <h2 className="price">{price}€/St.</h2>
            <div className="socialmedia_icons">
              <AiFillFacebook className="icon" />
              <AiFillInstagram className="icon" />
              <SlSocialTwitter className="icon" />
            </div>
            <hr />
            <div className="chat_widget">
              <h3>Jetzt Buchen!</h3>
              <p>Jetzt {trainerName} kontaktieren und berraten zu lassen.</p>
              {user && (
                <form onSubmit={(e) => sendMessage(e, message, user, email)}>
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
            </div>
          </div>
        </div>

        <SignModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </>
  );
};

export default Trainer;
