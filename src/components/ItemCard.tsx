import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { IAdData } from "../types/types";
import defaultPhoto from "../../public/logo.svg";

const ItemCard = ({
  id,
  title,
  photo,
  categories,
  description,
  about,
  price,
  time,
  location,
}: IAdData) => {
  const navigate = useNavigate();
  const email = id.replace("%2E", ".").replace(time.toString(), "");
  const [trainerName, setTrainerName] = useState("");

  useEffect(() => {
    const getUserData = async (email: string) => {
      const docRef = doc(db, "user_data", email);
      onSnapshot(docRef, (doc) => {
        setTrainerName(doc.data()!.name);
      });
    };
    getUserData(email);
  }, []);

  return (
    <div
      className="itemCard"
      onClick={() =>
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
