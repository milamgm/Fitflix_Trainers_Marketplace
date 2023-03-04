
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { IAdData } from '../../../../types/types'
import { deleteFromDB, useAppContext } from '../../../../utilities/utils'

interface Props {
    data: IAdData
}

const BtnArea = ({ data }: Props) => {
    const { user, userData, t } = useAppContext();
    const navigate = useNavigate();

    const email = user!.email;
    const trainerName = userData!.name;

    //Navigates to Ad page to edit it
    const handleEdit = () => {
        const editData = data;
        navigate("/anzeigeaufgeben", { replace: true, state: { editData } });
    };

    //Navigates to Ad page
    const goToAd = () => {
        navigate(`/trainer/${data.aid}`);
    };

    //Deletes Ad from database
    const handleDelete = async () => {
        try {
            deleteFromDB("ads_collection", data.aid)
            toast.success(t("adCard.toastSuccess"));
        } catch (err) {
            toast.error(t("global.toastError"));
        }
    };

    return (
        <div className="btn_area">
            <>
                <button className="card_info_btn" onClick={handleEdit}>
                    {t("adCard.edit")}
                </button>
                <button className="card_info_btn" onClick={goToAd}>
                    {t("adCard.goToAd")}
                </button>
                <button className="card_danger_btn" onClick={handleDelete}>
                    {t("global.delete")}
                </button>
            </>
        </div>
    )
}

export default BtnArea