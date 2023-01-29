import {
  AdCard,
  useAppContext,
  PhotoField,
  MessagesWidget,
} from "../../../utilities/utils";
import { useNavigate } from "react-router-dom";
import defaultUserPic from "../../../../public/user.svg";
import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userData } = useAppContext();
  const { photoURL, email } = user;
  const { name, postedAds, phoneNumber } = userData;

  let postedAdsArr = postedAds !== undefined ? Object.values(postedAds) : [];
  const adsArePosted = postedAdsArr.length >= 1;

  return (
    <div className="dashboard">
      {!adsArePosted && (
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

      {adsArePosted && (
        <div className="ads">
          <h2>Meine Anzeigen</h2>
          {postedAdsArr.map((data) => (
            <AdCard data={data} key={data.id} isListed={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
