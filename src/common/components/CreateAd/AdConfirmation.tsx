import AdCard from "../AdCard/AdCard";
import { IAdData } from "../../types/types";

interface IAdConfirmationProps {
  data: IAdData;
}
const AdConfirmation = ({ data }: IAdConfirmationProps) => {
  return (
    <div className="step">
      <h1>Gratulation, Deine Anzeige ist online!</h1>
      <AdCard data={data} />
    </div>
  );
};

export default AdConfirmation;
