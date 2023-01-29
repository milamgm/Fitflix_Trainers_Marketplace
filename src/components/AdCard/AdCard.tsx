import { deleteField, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { db } from "../../firebaseConfig";
import { IAdData } from "../../types/types";
import "./AdCard.scss";

interface IAdCardProps {
  data: IAdData;
  isListed: boolean;
}

const AdCard = ({ data, isListed }: IAdCardProps) => {
  const { user, userData } = useAppContext();
  const navigate = useNavigate();
  const { id, photo, title, categories, price, description, location, about } =
    data;
  const email = user.email;
  const trainerName = userData.name;

  const handleEdit = () => {
    const editData = data;
    navigate("/anzeigeaufgeben", { replace: true, state: { editData } });
  };

  //Deletes Ad
  const handleDelete = () => {
    // Delete from user document
    const docRef = doc(db, "user_data", user.email);
    const postsArr = Object.values(userData.postedAds).filter(
      (el) => el.id !== id
    );
    const updatedPosts = { ...postsArr };
    updateDoc(docRef, { postedAds: updatedPosts });
    // Delete from ads_collection
    const adsCollectionRef = doc(
      db,
      "ads_collection",
      location.split(",").slice(-2)[0]
    );
    updateDoc(adsCollectionRef, {
      [data.id]: deleteField(),
    });
  };

  //Navigates to Ad page
  const goToAd = () => {
    navigate("/trainer", {
      replace: true,
      state: {
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
        {isListed && (
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
        )}
      </div>
    </div>
  );
};

export default AdCard;
