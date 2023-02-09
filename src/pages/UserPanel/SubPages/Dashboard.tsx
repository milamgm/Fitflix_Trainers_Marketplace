import { AdCard, useAppContext, PhotoField } from "../../../utilities/utils";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useChatContext } from "../../../context/ChatContext";
import MessageCard from "../../../components/MessageCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userData } = useAppContext();
  const { partnertsData } = useChatContext();
  const { name, phoneNumber } = userData;
  const [postedAds, setpostedAds] = useState([]);
  
  useEffect(() => {
    const q = query(
      collection(db, "ads_collection"),
      where("uid", "==", user!.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setpostedAds([]);
      querySnapshot.forEach((doc) => {
        const adRes = doc.data();
        setpostedAds((prev) => [...prev, adRes]);
      });
    });

    return unsubscribe;
  }, []);

  return (
    <div className="dashboard">
      {postedAds.length === 0 && (
        <div className="post_tip">
          <h3>
            Sie haben noch keine Anzeige aufgegeben, geben Sie jetzt eine auf!
          </h3>
          <button onClick={() => navigate("/anzeigeaufgeben")}>
            Anzeige aufgeben
          </button>
        </div>
      )}
      <section>
        <div className="profile_card">
          <div className="content">
            <PhotoField img={userData!.profilePic} imgType="userPic" />
          </div>

          <h2 className="username">{name}</h2>
          <p>{userData!.email}</p>
          <p>{phoneNumber}</p>
          <button onClick={() => navigate("/benutzerpanel/konto")}>
            Daten Verarbeiten
          </button>
        </div>

        <div className="messages_card">
          <h2>Meine Nachtrichten</h2>
          {partnertsData.length === 0 && (
            <p>Sie haben keine neuen Nachrichten</p>
          )}
          <div className="content">
            {partnertsData.length >= 1 &&
              partnertsData.map((chat) => (
                <MessageCard key={chat.partnerUid} {...chat} />
              ))}
          </div>
        </div>
      </section>

      {postedAds.length >= 1 && (
        <div className="ads">
          <h2>Meine Anzeigen</h2>
          {postedAds.map((data) => (
            <AdCard data={data} key={data.aid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
