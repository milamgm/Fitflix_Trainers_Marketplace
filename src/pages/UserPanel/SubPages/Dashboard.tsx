import {
  AdCard,
  useAppContext,
  PhotoField,
  MessagesWidget,
} from "../../../utilities/utils";
import { useNavigate } from "react-router-dom";
import defaultUserPic from "../../../../public/user.svg";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userData } = useAppContext();
  const { photoURL, email } = user;
  const { name, phoneNumber } = userData;
  const [postedAds, setpostedAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const citiesRef = collection(db, "ads_collection");
      const q = query(citiesRef, where("uid", "==", user!.uid));
      const querySnapshot = await getDocs(q);
      setpostedAds([]);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const adsArr = doc.data();

        setpostedAds((prev) => [...prev, adsArr]);
      });
    };

    fetchAds();
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
            <PhotoField img={photoURL ?? defaultUserPic} imgType="userPic" />
          </div>

          <h2 className="username">{name}</h2>
          <hr />
          <p>{email}</p>
          <p>{phoneNumber}</p>
          <button onClick={() => navigate("/benutzerpanel/meinekonto")}>
            Daten Verarbeiten
          </button>
        </div>

        <div className="messages_card">
          <h2>Meine Nachtrichten</h2>
          <p>Sie haben keine neuen Nachrichten</p>
          <MessagesWidget />
        </div>
      </section>

      {postedAds.length >= 1 && (
        <div className="ads">
          <h2>Meine Anzeigen</h2>
           {postedAds.map((data) => (
            <AdCard data={data} key={data.aid} isListed={true} />
          ))} 
        </div>
      )}
    </div>
  );
};

export default Dashboard;
