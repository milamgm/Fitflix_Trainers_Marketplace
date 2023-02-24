import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, defaultPhoto } from "../../utilities/utils";
import { IAdData } from "../../types/types";
import "./ItemCard.scss";

const ItemCard = ({
  uid,
  aid,
  title,
  photo,
  categories,
  description,
  about,
  price,
  location,
}: IAdData) => {
  const navigate = useNavigate();
  const [trainerName, setTrainerName] = useState("");
  const [trainerUid, setTrainerUid] = useState("");
  const [trainerPic, setTrainerPic] = useState("");
  const [trainerPhone, setTrainerPhone] = useState("");

  //Fetches information from the advertiser user
  useEffect(() => {
    const getUserData = async (uid: string) => {
      const docRef = doc(db, "user_data", uid);
      onSnapshot(docRef, (doc) => {
        setTrainerName(doc.data()!.name);
        setTrainerUid(doc.data()!.uid);
        setTrainerPic(doc.data()!.profilePic);
        setTrainerPhone(doc.data()!.phoneNumber);
      });
    };
    getUserData(uid);
  }, []);

  return (
    <div
      className="itemCard"
      onClick={() =>
        navigate("/trainer", {
          replace: true,
          state: {
            aid,
            title,
            trainerUid,
            trainerName,
            trainerPhone,
            trainerPic,
            photo,
            categories,
            description,
            about,
            price,
            location,
          },
        })
      }
    >
      <div className="img_div">
        <img src={photo !== "" ? photo : defaultPhoto} alt={title} />
      </div>

      <div className="info">
        <h2>{trainerName}</h2>
        <div className="categories_badge">
          {categories.slice(0, 2).map((category) => (
            <span className="category_badge" key={category}>
              {category}
            </span>
          ))}
          {categories.length > 3 && (
            <span className="category_badge">+{categories.length - 2}</span>
          )}
        </div>
        <div className="description">{description}</div>
        <div className="price_badge">
          <h3>{price}€/St.</h3>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
