import AdCard from "../AdCard/AdCard";
import { IAdData } from "../../types/types";
import { useAppContext } from "../../utilities/utils";

interface IAdConfirmationProps {
  data: IAdData;
}
const AdConfirmation = ({ data }: IAdConfirmationProps) => {
  const { t } = useAppContext();
  return (
    <div className="step">
      <h1>{t("adConfirmation.confirmation")}</h1>
      <AdCard data={data} />
    </div>
  );
};

export default AdConfirmation;
