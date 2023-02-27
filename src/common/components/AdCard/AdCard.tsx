import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext, db } from "../../utilities/utils";
import { IAdData } from "../../types/types";
import "./AdCard.scss";

interface Props {
  data: IAdData;
}

const AdCard = ({ data }: Props) => {
  const { user, userData, t } = useAppContext();
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

  const email = user!.email;
  const trainerName = userData!.name;
  //Navigates to Ad page to edit it
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
  //Deletes Ad from database
  const handleDelete = async () => {
    try {
      // Delete from "ads_collection" document
      await deleteDoc(doc(db, "ads_collection", aid));
      toast.success(t("adCard.toastSuccess"));
    } catch (err) {
      toast.error(t("global.toastError"));
    }
  };
  return (
    <div className="adCard">
      <img src={photo} alt={title} width={200} />
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
            {t("adCard.edit")}
          </button>
          <button className="card_info_btn" onClick={goToAd}>
            {t("adCard.goToAd")}
          </button>
          <button className="card_danger_btn" onClick={handleDelete}>
            {t("adCard.delete")}
          </button>
        </>
      </div>
    </div>
  );
};

export default AdCard;
