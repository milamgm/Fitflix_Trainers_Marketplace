import { useLocation } from "react-router-dom";
import { CreateAd } from "../../utilities/utils";
import "./CreateAd.scss"

const CreatePost = () => {
  const location = useLocation();
  let editData;

  //Checks if an ad is being created or edited by checking if there is data in location.state of react router
  if (location.state !== null) {
    editData = location.state;
  }

  return (
    <div className="page_body">
      <CreateAd editDataParams={editData} />
    </div>
  );
};

export default CreatePost;
