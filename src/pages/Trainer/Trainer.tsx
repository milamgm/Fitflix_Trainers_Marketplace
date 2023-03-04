import { useEffect } from "react";
import {
  useAppContext,
  SignModal,
  BsFillTelephoneFill,
  AiFillFacebook,
  AiFillInstagram,
  SlSocialTwitter,
  db,
  Spinner,
} from "../../common/utilities/utils";
import { useState } from "react";
import done from "../../../public/done.svg";
import "./Trainer.scss";
import {
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import { IAdData, IUserData } from "../../common/types/types";

const Trainer = () => {
  const { user, userData, t } = useAppContext();
  const [adData, setAdData] = useState(INITIAL_DATA);
  const [fetched, setFetched] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [contacted, setContacted] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    const urlArr = url.split("/");
    const result =
      urlArr[urlArr.length - 1].charAt(0) + urlArr[urlArr.length - 1].slice(1);

    const docRef = doc(db, "ads_collection", result);
    let unsub = onSnapshot(docRef, (doc) => {
      console.log(doc.data());
      if (doc.data()) {
        const data = doc.data() as IAdData;
        setAdData(data);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (adData?.aid) {
      const docRef = doc(db, "user_data", adData?.uid);
      try {
        let unsub = onSnapshot(docRef, (doc) => {
          if (doc.data()) {
            const data = doc.data() as IUserData;
            setAdData((prev) => {
              return {
                ...prev,
                trainerUid: data.uid,
                trainerName: data.name,
                trainerPic: data.profilePic,
                trainerPhone: data.phoneNumber,
              };
            });
          }
          setFetched(true);
          return unsub;
        });
      } catch (error) {
        toast.error(t("global.toastError"));
      }
    }
  }, [adData?.aid]);

  const {
    aid,
    title,
    trainerUid,
    trainerName,
    trainerPic,
    trainerPhone,
    photo,
    categories,
    description,
    about,
    price,
    location,
  } = adData;

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
        const userchatsRef = doc(db, "user_chats", user!.uid);
        await setDoc(
          userchatsRef,
          {
            [trainerUid]: {
              chat_id: chatid,
              partner_uid: trainerUid,
              aid: aid,
            },
          },
          { merge: true }
        );
        //Sets the current user's uid as well as chat id and ad id in the partnerts's "user_chats" table.
        const trainerchatsRef = doc(db, "user_chats", trainerUid);
        await setDoc(
          trainerchatsRef,
          {
            [user!.uid]: {
              chat_id: chatid,
              partner_uid: user!.uid,
              aid: aid,
            },
          },
          { merge: true }
        );
        //Sets chat information in "chats" table
        const messagesRef = doc(db, "chats", chatid);
        await setDoc(
          messagesRef,
          {
            messages: arrayUnion({
              id: v4(),
              message,
              sender_uid: user!.uid,
              date: Timestamp.now(),
            }),
          },
          { merge: true }
        );
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
      {adData.trainerName !== "" && (
        <>
          <div className="ad_image">
            <img src={photo} alt={title} />
          </div>
          <div className="page_body">
            <div className="trainer">
              <div className="main_div">
                <h1>{title}</h1>
                <h3>
                  {t("trainer.subtitle")} {location}
                </h3>
                <div className="badges_div">
                  {categories.map((cat: string) => (
                    <div key={cat} className="badge">
                      {cat}
                    </div>
                  ))}
                </div>
                <div className="description_div">
                  <h2>{t("trainer.aboutCourse")}</h2>
                  <hr />
                  <p>{description}</p>
                </div>
                <div className="description_div">
                  <h2>
                    {t("trainer.about")}
                    {trainerName}
                  </h2>
                  <hr />
                  <p>{about}</p>
                </div>
              </div>
              <div className="second_div">
                <img
                  className="avatar_photo"
                  src={
                    trainerPic !== undefined ? trainerPic : userData!.profilePic
                  }
                  alt={trainerName}
                />
                <h3>{trainerName}</h3>
                {trainerPhone !== undefined && (
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
                {trainerUid && (
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
                                t("trainer.contactPlaceholder") +
                                trainerName.split(" ")[0]
                              }
                            ></textarea>
                            <button type="submit">
                              {t("trainer.contactBtn")}
                            </button>
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
                )}
              </div>
            </div>

            <SignModal openModal={openModal} setOpenModal={setOpenModal} />
          </div>
        </>
      )}
      {!fetched && (
        <div className="loading">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Trainer;

const INITIAL_DATA = {
  aid: "",
  title: "",
  trainerUid: "",
  trainerName: "",
  trainerPic: "",
  trainerPhone: "",
  photo: "",
  categories: "",
  description: "",
  about: "",
  price: "",
  location: "",
};
