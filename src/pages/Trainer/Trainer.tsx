import { useEffect, useState } from "react";
import {
  BsFillTelephoneFill,
  AiFillFacebook,
  AiFillInstagram,
  SlSocialTwitter,
  Spinner,
  getAd,
  getUser,
} from "../../common/utilities/utils";
import "./Trainer.scss";
import { IAdData, IUserData } from "../../common/types/types";
import ContactForm from "./components/ContactForm/ContactForm";
import { redirect, useParams } from "react-router-dom";
import { t } from "i18next";

const Trainer = () => {
  const [ad, setAd] = useState<IAdData | null>(null);
  const [trainer, setTrainer] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);
  let { adId } = useParams();

  const retrieveData = async (adId: string) => {
    const ad = await getAd(adId);
    if (!ad) {
      return redirect("/");
    } else {
      const trainer  = await getUser(ad.uid);
      setAd(ad);
      setTrainer(trainer);
      setLoading(false);
    }
  };

  useEffect(() => {
    adId && retrieveData(adId);
  }, []);

  return (
    <>
      {!loading && ad && trainer && (
        <>
          <div className="ad_image">
            <img src={ad.photo} alt={ad.title} />
          </div>
          <div className="page_body">
            <div className="trainer">
              <div className="main_div">
                <h1>{ad.title}</h1>
                <h3>
                  {t("trainer.subtitle")} {ad.location}
                </h3>
                <div className="badges_div">
                  {ad.categories.map((cat: string) => (
                    <div key={cat} className="badge">
                      {cat}
                    </div>
                  ))}
                </div>
                <div className="description_div">
                  <h2>{t("trainer.aboutCourse")}</h2>
                  <hr />
                  <p>{ad.description}</p>
                </div>
                <div className="description_div">
                  <h2>
                    {t("trainer.about")}
                    {trainer.name}
                  </h2>
                  <hr />
                  <p>{ad.about}</p>
                </div>
              </div>
              <div className="second_div">
                <img
                  className="avatar_photo"
                  src={
                    trainer?.profilePic !== undefined
                      ? trainer.profilePic
                      : trainer!.profilePic
                  }
                  alt={trainer.name}
                />
                <h3>{trainer.name}</h3>
                {trainer.phoneNumber !== undefined && (
                  <div className="phone_div">
                    <BsFillTelephoneFill />
                    <h4>{trainer.phoneNumber}</h4>
                  </div>
                )}
                <h2 className="price">{ad.price}€/St.</h2>
                <div className="socialmedia_icons">
                  <AiFillFacebook className="icon" />
                  <AiFillInstagram className="icon" />
                  <SlSocialTwitter className="icon" />
                </div>
                <hr />
                {trainer.uid && <ContactForm adData={ad} trainer={trainer} />}
              </div>
            </div>
          </div>
        </>
      )}
      {loading && (
        <div className="loading">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Trainer;
