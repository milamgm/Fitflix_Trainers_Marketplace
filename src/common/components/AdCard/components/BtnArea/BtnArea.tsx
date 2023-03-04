<<<<<<< HEAD

import { toast } from 'react-hot-toast'
=======
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
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
<<<<<<< HEAD
        navigate(`/trainer/${data.aid}`, {
=======
        navigate("/trainer", {
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
            replace: true,
            state: {
                ...data,
                email,
<<<<<<< HEAD
                trainerName
=======
                trainerName,
                location,
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
            },
        });
    };

    //Deletes Ad from database
<<<<<<< HEAD
    const handleDelete = async () => {
        try {
            deleteFromDB("ads_collection", data.aid)
            toast.success(t("adCard.toastSuccess"));
        } catch (err) {
            toast.error(t("global.toastError"));
        }
    };

=======
    const handleDelete = () => {
        deleteFromDB("ads_collection", data.aid)
    };
    
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
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