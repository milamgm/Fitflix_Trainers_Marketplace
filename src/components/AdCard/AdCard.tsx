import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { db } from "../../firebaseConfig";
import { IAdData } from "../../types/types";
import "./AdCard.scss";

interface IAdCardProps {
  data: IAdData;
  isListed: boolean;
}

const AdCard = ({ data }: IAdCardProps) => {
  const { user, userData } = useAppContext();
  const navigate = useNavigate();
  const {
    aid,
    uid,
    photo,
    title,
    categories,
    price,
    description,
    location,
    about,
  } = data;

  const email = user.email;
  const trainerName = userData.name;

  const handleEdit = () => {
    const editData = data;
    navigate("/anzeigeaufgeben", { replace: true, state: { editData } });
  };

  //Navigates to Ad page
  const goToAd = () => {
    navigate("/trainer", {
      replace: true,
      state: {
        aid,
        uid,
        title,
        email,
        trainerName,
        photo,
        categories,
        description,
        about,
        price,
        location,
      },
    });
  };
  //Deletes Ad
  const handleDelete = async () => {
    try {
      // Delete from user_ads
      const useradsRef = doc(db, "user_ads", uid);
      await updateDoc(useradsRef, {
        [aid]: deleteField(),
      });
      // Delete from ads_collection
      await deleteDoc(doc(db, "ads_collection", aid));
      toast.success("Ihrer Anzeige wurde erfolgreich gelöscht");
    } catch (err) {
      toast.error("Fehler. Bitte probieren Sie noch Mal.");
    }
  };
  return (
    <div className="adCard">
      <img src={photo} alt="" width={200} />
      <div className="description">
        <h3>
          <b>{title}</b>
        </h3>
        <h5>
          <i>{location}</i>
        </h5>
        <p>{description}</p>
        <div className="badge_div">
          {categories.slice(0, 2).map((category) => (
            <span className="hashtag" key={category}>
              {category}
            </span>
          ))}
          {categories.length > 3 && (
            <span className="hashtag">+{categories.length - 2}</span>
          )}
          <span className="price">{price}€</span>
        </div>
      </div>
      <div className="btn_area">
        <>
          <button className="card_info_btn" onClick={handleEdit}>
            Bearbeiten
          </button>
          <button className="card_info_btn" onClick={goToAd}>
            Zur Anzeige gehen
          </button>
          <button className="card_danger_btn" onClick={handleDelete}>
            Loschen
          </button>
        </>
      </div>
    </div>
  );
};

export default AdCard;
