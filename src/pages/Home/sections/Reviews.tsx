import image16 from "../../../../public/image16.jpg";
import image17 from "../../../../public/image17.jpg";
import { useAppContext } from "../../../application/context/AppContext";


const Reviews = ({ addToRefs }: Props) => {
  const { t } = useAppContext();
  return (
    <>
      <div className="comment" ref={addToRefs}>
        <div className="header">
          <img className="avatar" src={image17} alt="" />
          <div className="info">
            <h4>{t("home.section3.review1.name")}</h4>
            <h6>{t("home.section3.review1.date")}</h6>
          </div>
          <div className="stars">
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
          </div>
        </div>
        <p>{t("home.section3.review1.description")}</p>
        <small>{t("home.section3.review1.about")}</small>
      </div>
      <div className="comment" ref={addToRefs}>
        <div className="header">
          <img className="avatar" src={image16} alt="" />
          <div className="info">
            <h4>{t("home.section3.review2.name")}</h4>
            <h6>{t("home.section3.review2.date")}</h6>
          </div>
          <div className="stars">
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
            <img src="star.svg" alt="" className="star" />
          </div>
        </div>
        <p>{t("home.section3.review2.description")}</p>
        <small>{t("home.section3.review2.about")}</small>
      </div>
    </>
  );
};

export default Reviews;
