import { IAdData } from "../../types/types";
import "./AdCard.scss";
import BtnArea from "./components/BtnArea/BtnArea";

interface Props {
  data: IAdData;
}

const AdCard = ({ data }: Props) => {
 
  return (
    <div className="adCard">
      <img src={data.photo} alt={data.title} width={200} />
      <div className="description">
        <h3>
          <b>{data.title}</b>
        </h3>
        <h5>
          <i>{data.location}</i>
        </h5>
        <p>{data.description}</p>
        <div className="badge_div">
          {data.categories.slice(0, 2).map((category) => (
            <span className="hashtag" key={category}>
              {category}
            </span>
          ))}
          {data.categories.length > 3 && (
            <span className="hashtag">+{data.categories.length - 2}</span>
          )}
          <span className="price">{data.price}€</span>
        </div>
      </div>
      <BtnArea data={data}/>
    </div>
  );
};

export default AdCard;
